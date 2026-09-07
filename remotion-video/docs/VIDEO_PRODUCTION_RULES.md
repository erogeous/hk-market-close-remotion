# Global video production rules

This document is the human-readable production standard for every Remotion
project in this repository. Project-specific files may override these defaults.

## Creative direction

- Default style: modern, clean, restrained, premium, and information-first.
- Prefer strong hierarchy, generous whitespace, purposeful transitions, and
  one clear focal point per shot.
- Avoid decorative motion that competes with narration or key information.
- Animation must be frame-based and deterministic; avoid CSS transitions and
  wall-clock timers.
- Default transition rhythm: 8–16 frames for small UI motion, 15–24 frames for
  scene transitions, adjusted to the project's FPS and pacing.

## Typography

- Fonts must be stored under `public/projects/<project-id>/fonts/`.
- Prefer WOFF2. Keep only the weights and styles actually used.
- Default family roles: one display/sans family for headings and body, with a
  monospace family only when the content calls for it.
- Use no more than two type families and three weights in one video unless the
  project brief explicitly requires more.
- Minimum recommended final-size text: 42 px at 1920×1080 and 48 px at
  1080×1920. Captions should normally be 48–72 px at those sizes.
- Use a fallback stack and verify Chinese, Latin, numerals, and punctuation for
  every language used in the video.

## Color

- All colors must come from the active project's `project.config.ts`.
- Default fallback palette (only for a new unbranded project):
  - Background: `#0B0D12`
  - Surface: `#151923`
  - Primary text: `#F7F8FA`
  - Muted text: `#A8B0BF`
  - Brand/accent: `#5B8CFF`
  - Success: `#27C281`
  - Warning: `#F5B942`
  - Error: `#F05D5E`
- Target at least 4.5:1 contrast for normal text and 3:1 for large text and
  essential graphics.
- Gradients, shadows, glow, and texture should be subtle and specified at the
  project level before they become part of the visual language.

## Layout and logo

- Default safe area: 5% on each edge. Captions must also account for platform
  UI overlays defined in the project brief.
- Logos belong in `public/projects/<project-id>/logos/` and should preferably be
  SVG or transparent PNG.
- Preserve clear space around the logo. Use the preferred light/dark variant for
  its background and never distort its aspect ratio.
- Project stills, illustrations, and photos belong in `images/`; source footage
  and generated clips belong in `video/`.

## Audio

- Voice, music, and sound effects belong in `public/projects/<project-id>/audio/`
  and should be named with a role prefix such as `vo-`, `music-`, or `sfx-`.
- Default delivery target: integrated loudness around -14 LUFS and true peak at
  or below -1 dBTP. Project or platform requirements may override this.
- Speech must remain intelligible. Duck music under voice and avoid abrupt audio
  cuts; use short frame-based fades unless a hard cut is intentional.
- Record asset source and license information in the project's `ASSETS.md`.

## Export

- The active project's `project.config.ts` is the machine-readable source for
  dimensions, FPS, codec, container, pixel format, audio codec, and output path.
- Default master: 1920×1080, 30 FPS, MP4/H.264, `yuv420p`, AAC audio.
- Use high-quality H.264 for general delivery. Use ProRes 422 HQ or an approved
  equivalent for an editing master or alpha-capable intermediate when requested.
- File names must include project ID, composition ID, aspect/profile, and version,
  for example: `acme-launch-main-vertical-v001.mp4`.
- Never overwrite a final render silently. Increment the version or obtain user
  confirmation.

## Quality gate

Before delivery:

1. Confirm the correct project configuration and asset inventory were used.
2. Check typography, contrast, logo treatment, safe areas, and spelling.
3. Check first, middle, transition, and final frames for clipping or flicker.
4. Listen for clipping, bad edits, excessive music level, and unwanted silence.
5. Run ESLint and TypeScript checks.
6. Render the requested profile and report exact delivery settings.

