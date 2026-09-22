# Creative direction draft

Working brief, 20 September 2026. Source branch: `preview`.

## Direction from Ross

- Lead with creative flair and Ross's own vision.
- Give live lighting, video, design and production a clear place alongside cinematography.
- Explore alternatives to the landing-page triptych. Keep both a unified creative practice and a film/live split open.
- Reframe engineering as notes from the things Ross is building and working through. Reduce career and recruitment language.
- Keep studio.imla.ch secondary while its identity develops. A larger studio repositioning is deferred.

## Review surfaces

- `/directions/`: attributed peer mood board, palette/type study, and three interactive landing sketches. Uses Ross's images within the sketches and peer images only in the clearly marked references. Marked noindex.
- `/`: the selected A landing, using the shared `CreativeLanding` component also shown in the mood board. Image / experience switches the photograph, headline, role and destination.
- `/live/`: first editorial iteration, led by lighting design and the overall visual approach, followed by video and production. Keeps the existing live-events photograph while portfolio selection remains open.
- `/engineering/`: the existing writing, introduced as **In the weeds**. URLs and feed remain stable.

The sketches are proposals, not final claims about availability or a finished studio identity. The sibling studio repository and cluster configuration have not been edited.

## Landing studies

- **A. One opening image**: suggested starting point. Lead with a whole image and a personal creative statement. The `image | experience` wordmark is the switch, with an underline and brighter text marking the selected view. Image selects Film and “Shaping the image.” with an explicit Director of Photography role line; experience selects Live and “Shaping the experience.” with lighting, video and creative direction. Switching also updates the photograph and work link. The notebook sits below and Studio is in the footer. Film uses `films/feeble/5.jpg`, also used in B.
- **B. Film & live**: two creative directions visible together, with the technical notebook below. Clearest if both should receive equal emphasis.
- **C. A personal index**: type and an image sit alongside a short index of work. Flexible as the practice develops and less dependent on having a reel ready.

## Peer references

Presentation was inspected on the live websites. The notes are design interpretations, not endorsements or claims of comparable project scale.

| Reference | What informs the draft |
| --- | --- |
| [Tobias Rylander](https://tobiasrylander.com/) | Whole-stage opening image, quiet navigation, project atmosphere |
| [Luke Halls Studio](https://lukehalls.com/) | One visual practice spanning multiple performance contexts |
| [United Visual Artists](https://www.uva.co.uk/) | Offset imagery, negative space, light and systems within one practice |
| [Treatment Studio](https://www.treatmentstudio.com/work/) | Varied project proportions and a quiet gallery framework |
| [FRAY Studio](https://fraystudio.com/) | Live imagery and the audience experience as the introduction |
| [Rob Sinclair](https://www.robsinclair.com/) | A designer's own name, project imagery and personal voice |

Low-resolution reference images and their exact source URLs are in `astro/src/assets/references/`. They belong to their respective creators and are included for the mood-board discussion. They must not become Ross's portfolio images.

## Preview deployment

`preview` already existed and matched `master` at the start of this session. The existing `.github/workflows/preview.yml` builds `astro/` and publishes `preview-pages`. The cluster's `site-preview/imla-ch` deployment polls that branch every 20 seconds.

Review URL: <https://imla-preview.x.imla.ch/directions/> (internal LAN ingress).

Local development: `cd astro && npm run dev`. Build: `cd astro && npm run build`.

Production remains `master` → GitHub Pages. No production merge is part of this draft.

## Next iteration

Ross supplied six lighting photographs during the first pass. Web-sized copies are in `astro/src/assets/live/`; original files are untouched. The board now shows the six images before the peer references. Suggested compositions use the warm crowd for A, blue room for B and crossed white beams for C. A shared image selector lets Ross compare any of the six across all three structures. The desk photograph is proposed for process/notebook context.

Choose a landing structure and image. Add show names, dates, exact roles and photographer credits to the selected work. Shape one case study around the initial idea, the creative choices and what the audience saw. Keep the notebook personal and concrete; let the longer studio identity work follow later.

## Live page iteration, 22 September 2026

Ross confirmed Lighting Design as the role on all six supplied images. Photography is partly Ross and partly Michael Roddy; the exact mapping is not yet confirmed. Ross is unsure about using these stills as the portfolio selection. Keep them on the mood board for now, and do not invent show titles or individual photo credits. The first Live revision develops structure and copy using the existing live-events image; project case studies and final photography remain open.
