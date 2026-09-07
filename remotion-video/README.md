# Remotion video workspace

This repository contains the Remotion source code and project assets for the
Hong Kong market-close video. Rendered MP4 files and installed dependencies are
intentionally excluded from Git.

## Install and render the Hong Kong market-close video

Requirements: Node.js 20 or newer and pnpm.

```console
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the `HKMarketCloseFullVideo` composition in Remotion Studio. To render the
complete vertical video:

```console
pnpm render:hk-full
```

Remotion is declared in `package.json` and locked in `pnpm-lock.yaml`. Do not
commit `node_modules`; `pnpm install` downloads the exact project dependencies.
The reusable visual assets are stored under
`public/projects/hk-market-close/` and are committed with the source code.

This workspace keeps global production rules separate from project-specific
brand rules and assets. Codex is instructed by `AGENTS.md` to read them before
creating or rendering video content.

## Start a new video project

1. Copy `projects/_template` to `projects/<project-id>`.
2. Copy `public/projects/_template` to `public/projects/<project-id>`.
3. Fill in `PROJECT.md`, `project.config.ts`, and `ASSETS.md`.
4. Put fonts, audio, logos, images, and footage only in that project's folders.
5. Ask Codex to create the video and name the project ID and export profile.

Example request:

> Read the production rules and create the `acme-launch` project using the
> `vertical` export profile. Preview representative frames before rendering.

The global standard lives in `docs/VIDEO_PRODUCTION_RULES.md`. Project values
override those defaults.

## Visual image-motion workspace

Run `pnpm dev`, open the `ImageMotionClip` composition, and edit values in the
Studio Props panel. The preview updates from the same props used for rendering.

Available controls include:

- Project-relative image path
- Zoom, pan, and drift motion presets
- Duration and animation intensity
- Landscape, vertical, and square output
- Cover/contain fit and focal point
- Background color, blurred fill, corner radius, and safe-area guide

Put the source image in `public/projects/<project-id>/images/`, then enter a path
such as `projects/acme-launch/images/hero.jpg`. Render each animated image as a
separate H.264 MP4 clip for import into CapCut/Jianying.

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
