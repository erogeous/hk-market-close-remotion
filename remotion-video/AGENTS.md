# Remotion production instructions

These instructions apply to every change in this Remotion workspace.

## Mandatory reading order

Before planning, writing, or rendering a video:

1. Read `docs/VIDEO_PRODUCTION_RULES.md` completely.
2. Identify the target project ID. Never assume `default` when the user names another project.
3. Read `projects/<project-id>/PROJECT.md` and `projects/<project-id>/project.config.ts` completely.
4. Read `public/projects/<project-id>/ASSETS.md` and inspect the listed asset folders.
5. Only then edit compositions, add assets, preview, or render.

If the target project does not exist, copy both `projects/_template` and
`public/projects/_template` to matching `<project-id>` folders before creating
video content. Keep all project-specific assets inside that project's public
folder. Do not mix assets between projects.

## Source of truth

- Global defaults: `docs/VIDEO_PRODUCTION_RULES.md`
- Project brief and exceptions: `projects/<project-id>/PROJECT.md`
- Machine-readable design and export values: `projects/<project-id>/project.config.ts`
- Asset inventory and licensing notes: `public/projects/<project-id>/ASSETS.md`

Project-level values override global defaults. If two instructions conflict or
a required value is missing, stop and ask the user instead of inventing a brand
decision.

## Production requirements

- Use Remotion primitives and deterministic, frame-based animation.
- Load local assets with `staticFile()`; never reference a project asset by an
  absolute filesystem path.
- Use only fonts, logos, music, sound effects, images, and footage belonging to
  the active project unless the user explicitly authorizes reuse.
- Register local fonts before rendering text. Provide a safe fallback stack.
- Use the colors and typography tokens from `project.config.ts`; do not scatter
  unexplained hex values through components.
- Preserve logo aspect ratio. Never recolor, stretch, crop, or add effects to a
  logo unless the project rules explicitly allow it.
- Keep important text and logos inside the configured safe area.
- Audio must not clip. Apply the configured loudness and true-peak targets when
  preparing final audio.
- Preview representative frames and run lint/type checks before final render.
- Render using a named export profile from `project.config.ts` and report the
  exact output path, codec/container, dimensions, FPS, and audio settings.

