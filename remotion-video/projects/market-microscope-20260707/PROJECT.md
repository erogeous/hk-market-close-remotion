# Project brief: market-microscope-20260707

## Objective

Turn nine flattened financial-data storyboard images into restrained animated
data cards. Preserve every number and label exactly as supplied. Deliver silent,
standalone clips for editing in Jianying/CapCut.

## Audience and platform

- Audience: Chinese-language financial-market viewers
- Platform: Jianying/CapCut vertical edit
- Language: Simplified Chinese
- Target duration: 4 seconds per shot
- Required aspect ratio: 9:16

## Creative direction

- Tone: precise, technical, calm, data-first
- Style: dark financial HUD with cyan, green, red, and blue accents
- Motion: local chart reveals, scanner sweeps, pulses, node ripples, and subtle
  camera push; no aggressive bounce or decorative transitions
- Must include: all nine images in numerical order, unchanged data and wording
- Must avoid: audio, voiceover, invented numbers, replacing text, large camera
  moves that reduce readability

## Confirmed animation logic

Use `MarketMicroscope02V2` as the reference for information hierarchy and
timing, not the earlier V1 scan/highlight treatment.

1. The opening state should ideally contain no foreground text or data. Build
   the information onto the screen instead of revealing an already-complete
   flattened poster.
2. Introduce the main title first. A character-by-character soft reveal is the
   preferred default for Chinese headings.
3. Introduce content modules in reading order. Preserve the original grid and
   avoid moving entire cards merely for decoration.
4. Animate important values from an empty/zero state to their final values with
   an odometer or count-up treatment. Percentages follow the primary value.
5. Draw line charts progressively from left to right. Grow bar charts from the
   baseline. Build donut charts, heatmaps, and relationship nodes according to
   their real visual structure rather than applying a generic sweep.
6. Secondary totals and comparison values appear only after the primary modules
   are established.
7. Keep the final state long enough to read before the cut. Do not add music or
   voiceover.
8. The current V2 may retain some text from the flattened source, but future
   reconstructions should prefer a clean initial state with all foreground text
   controlled as animated layers.

The user has approved this overall logic. Individual typography, masking, and
timing details may still be refined per shot.

## Brand exceptions

The supplied flattened artwork is authoritative. Its typography and colors
override global defaults for these clips.

## Deliverables

- `MarketMicroscope01` through `MarketMicroscope09`
- 1080×1920, 30 FPS, H.264 MP4, no audio
- `out/market-microscope-20260707-01-v001.mp4` through `09-v001.mp4`
