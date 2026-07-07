---
title: "Breadcrumbs for the human in the loop"
date: 2026-07-07
readingTime: "3 min"
summary: "Coding agents have made it easier than ever to ship changes, and harder than ever to keep an eye on them all. cora is the review agent I built and run on my own GPUs, leaving breadcrumbs for the human in the loop."
draft: false
---

cora is a review agent I built and run to keep a level of oversight on a
high velocity of changes, driven by the adoption of coding agents.

## Why

When working solo or in small teams, I really feel the conflict between velocity
and maintaining a high level of code quality. This has become even rougher
with coding agents (Claude, Codex, etc.) — we've gotten used to massive changes
being pushed regularly, and trying to catch every potential issue in these huge
diffs isn't getting any easier. cora was built with this in mind, so as the human in
the loop there are at least some breadcrumbs to follow.

It wasn't a reflex build either — I ran a build-vs-buy pass over the field first
(CodeRabbit, PR-Agent, Kodus, and friends). Almost everything treats the reviewer
as a commentator that fires once when the PR opens; nothing I evaluated would fold
failing CI back into a re-review, gate automerge on its own verdict, or treat
self-hosted models as a first-class backend. So it stayed a build.

## The details

It's a Pydantic-based agentic loop that runs either natively in GitHub Actions or in
an ephemeral container, with tools available to safely look up upstream releases,
inspect live cluster state, and query project documentation, postmortems, code and
more via RAG endpoints. Each repository it runs on can have a tailored system
prompt, pointing to project conventions and allowing the review config to be
tracked alongside the code it's reviewing.

The WebFetch tool chunks the response and passes it through a classifier to check
for prompt injection. I started with a QLoRA-tuned lightweight LLM, but trained on
the same dataset, a BERT classifier on CPU is actually 10x faster than the tuned
1.7B model.

## The backend

It hits an OpenAI-compatible /v1/chat/completions endpoint, so in theory it can be used
with any LLM provider, but I've been self-hosting my own open-weight models on
vLLM/KubeRay.

This primarily means I can have it run on every PR (peak is probably over 100/day
at the moment) without having to worry about per-token costs (albeit the capex and
running costs aren't free either). It also means I can regularly run fine-tunes
across the GPUs during quiet times — automated with KubeRay and KEDA, with the
power lifecycles handled by nightwatch (https://github.com/imlach/nightwatch).

There's an outcome-graded eval harness in the loop too: reviews get scored after
the fact against what actually happened — whether flagged issues got fixed, or
slipped through into the same postmortems it queries during review. Those scores
steer the regular fine-tunes, so the model improves against real outcomes rather
than vibes.

## How's it going?

Since it's easier than ever to ship changes, we now all have the burden of never-ending
dependency bumps to manage as well. Renovate can actually run weekly without
completely saturating the finite resource (me). Changes I make get, figuratively,
another pair of eyes on them, and the entire stack continues to get better as it
learns from changes, reviews it's made, and the outcomes recorded in docs and
postmortems.

I'm continuing to build this out and tweak as I go, and it's all on GitHub:
https://github.com/imlach/cora
