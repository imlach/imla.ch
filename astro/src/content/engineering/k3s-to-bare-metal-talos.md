---
title: "Losing the hypervisor for Talos on bare metal"
date: 2026-06-21
readingTime: "5 min"
summary: "Wiped a 7-node heterogeneous GPU cluster and rebuilt it from k3s-on-Proxmox to bare-metal Talos. How to do a full rebuild without a cloud provider."
draft: false
---

It's a small cluster, 7 nodes, with a mixed fleet of various GPUs for a few different workloads - definitely the sort of thing you'd call heterogeneous. A collection of HP Elitedesk SFFs, Dell R740s, and a Dell workstation. This was running a few VMs for a real mix of workloads, some Davinci Resolve remote render VMs for film work (see https://studio.imla.ch/tools/dailies-pipeline/), a k3s cluster, Postgres primary & replicas, DNS, remote claude workbench, utilities for managing BMCs, and so on.

Now it's purely a Talos (v1.13.3) K8s (v1.36.1) cluster, with everything running as pods natively in kubernetes. It runs a real variety of workloads across a mix of Ampere and Blackwell GPUs, RDMA between the heavy GPU workers, immutable, and self-provisions all from PXE.


## The before (why the VM layer became pure overhead)

To start with I had a classic proxmox install, with centralised NFS/iSCSI storage running a handful of VMs, including k3s.

Over the last while I've consolidated almost everything into kubernetes (including resolve, which was a saga in itself¹ ) and more and more it started to be obvious that the hypervisor was an unnecessary overhead on the small boxes especially. This, plus a stack of ansible handling all the VM provisioning, lifecycling etc, with risk of drift made Talos directly on the boxes the obvious solution. Made especially straightforward with anything that needed to persist the migration being an iSCSI or NFS PVC.

(¹ I ran 3 resolve VMs that would be booted when needed, displacing the GPU k3s worker which was a bit of a faff. Decided to trade that faff for having some fairly pet-like pods that are pinned to hosts to handle the specific licence seats which allows for much faster scheduling of different services.)

To go ahead with this though, there were a few decisions to make and gaps to close. I considered k3s on metal, or re-adopting the whole stack with terraform to try and avoid the drift, but doing that still didn't close the immutability gap in the same way Talos does. Especially having moved to cilium everywhere, and handling VFIO passthrough for the GPUs and RoCE NICs, I decided to take the plunge to Talos.


## The Plan, and Lessons

Once I was happy all the prep I could plan for was in place, it was time to go and all the nodes were shut down. Each was brought up one at a time (arming the config in iPXE), installing Talos and watching it appear in the new cluster. (Given the small number of hosts, I'm running three schedulable control planes, and 4 GPU nodes.)

The per-node arming earned its keep in the silliest possible way — mid-cutover I power-cycled the wrong box (a `pve-NN` vs `talos-NN` mix-up, worth explicitly checking the list for). An un-armed node just falls through to booting its local disk, so it came straight back up on its installed Talos. No reimage, no damage, quorum held.

### The bootstrap chicken-and-egg

To completely rebuild from scratch, obviously nothing could be depended on that runs on the cluster (harbor, DNS, hardware automation, etc). A good few circular dependencies were uncovered running as tiny VMs on the hypervisor like DNS, meshcentral for consolidating BMCs across some of the machines, as well as the container registry living in Harbor on the cluster itself.

Given the storage was sticking around, this ended up being the ideal place to host all these dependencies. Especially useful since all the containers / metrics / etc are backed by object storage in `garage` (doing an active/passive write, active/active read setup) providing an s3 capable endpoint - `registry` came to the rescue here running on two of storage nodes to allow services to recover without the full circular dependency issue.

DNS was fairly straightforward too, I had `technitium` running in VMs previously, but this was a good opportunity to move them to the storage nodes as well and have those take over the VIPs.

This just left pxe to get up and running under plain docker on the storage nodes (VIPed active/passive just in case.)

### Big Bang vs Rolling

Since this was an entire lift-and-shift with the hardware constraints, rather than migrating all the VMs to the larger hosts and bringing up the new stack slowly, I decided to just do a full move in all in one. Etcd was backed up to Garage, all data was safe out of the cluster, and all the manifests were in git, which all de-risked the move as I could be fairly confident re-building the old stack if needed.

What really killed 'rolling' was that a Talos worker can't join a k3s control plane — so a gradual migration isn't gradual, it's two whole clusters side-by-side on the same storage, split DNS and two ExternalDNS controllers fighting over one zone the entire time. A big-bang trades that coexistence tax for one outage window, and with a few hours of downtime to spare that was an easy call. A small VM rehearsal with a dummy workload first confirmed there were no total show-stoppers.

It also doubled as a proper disaster-recovery test — rebuilding the whole cluster from git and the surviving storage is exactly the drill you're "supposed" to run regularly, and rolling never makes you actually prove that works.

### Don't rename live endpoints mid-cutover

Since this was a bit of a lift and shift, there are a few strange naming artefacts left over. For example one of the iSCSI datasets is rooted in `k3s/*`, and there's a `iqn…:k3s` target left too. I decided it wasn't worth doing a full rename at the same time as well, risking an even bigger change.

At the end of the day, this just has to be something that lives in the docs to make sure it makes sense after the context has totally disappeared!

### Talos idiosyncrasies

* Talos won't provision EPHEMERAL over an existing partition - This was an easy one, but did trip me up during provisioning. Every disk still carrying an old VM store had to be manually `talosctl wipe disk`'ed first; the factory-blank scratch SSDs sailed through, the reused ones each cost a wipe. Not a huge blocker in the end, but definitely worth bearing in mind.

* nvidia-open needs explicit machine.kernel.modules - A bit of a silent failure until I tried to schedule workloads, the nodes looked `Ready` while ext-nvidia-persistenced waited forever.

* Talos's read-only rootfs vs HAMi's default write location - On the old k3s-on-Debian VMs, /usr/local was just a normal writable directory, however Talos's host filesystem is read-only except for a small allowlisted set of writable paths. This meant when HAMi tried to inject its vGPU mounts, containerd spec generation failed on every GPU pod. This caught me out as I'd swept for stale IPs, names, etc, however I'd completely overlooked the paths on the host (as I'd assumed everything else would re-create from the manifests). On another note, `/usr/local/vgpu` was hardcoded in the vllm CRIU snapshots too, which meant a full re-capture was needed of those too.


## All in all....

Ansible based config went from handling the hypervisor management, VM provisioning, etc to just the out-of-band stack. (The cutover deleted ~8.7k lines of VM/Proxmox-specific roles and playbooks — the sweep commit was −18.9k lines all-in — halving the playbook count 82→44 and dropping a third of the roles 51→36.)

Otherwise so far it's been a mixed bag. Most workloads are happy and less overhead is lost to the hypervisor layer. It's also opened up the path to more straightforward host autoscaling with a little kubernetes operator I've been working on - https://github.com/imlach/nightwatch

However, there has been a real issue with stability around checkpoint/restore managed vllm workloads. (Using Dynamo Snapshot/Cuda-checkpoint, I had inference scaling across multiple GPUs so it'd go from initial request to ready in <30s. There seems to be a bug relating to this that's taken down two hosts pretty reliably - would love some insights into this if anyone has any).
