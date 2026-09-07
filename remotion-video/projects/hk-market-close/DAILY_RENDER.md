# Daily full-video render

1. Update the trade date and market values in `src/data/`.
2. Keep the exported object names stable; no component code needs to change.
3. Run `npm run render:hk-full`.
4. The completed vertical MP4 is written to `out/hk-market-close-full-vertical.mp4`.

## Stock-focus footer rule

The footer of the stocks-in-focus screen is an international index strip, not a
repeat of Hong Kong summary metrics. Fetch and display Dow Jones, Hang Seng,
Nikkei 225, and FTSE 100. Store each index's own `marketDate`; use the latest
completed session for that market and never carry reference-image values into a
new trading date.

Composition order: global markets, Hong Kong snapshot, market breadth, sector
performance, stocks in focus, southbound funds, and market wrap-up. Each scene
keeps its own deterministic Remotion animation and overlaps the next scene by 15
frames for a short crossfade.
