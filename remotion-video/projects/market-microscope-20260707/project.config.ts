import type { VideoProjectConfig } from "../project-config.types";

const config: VideoProjectConfig = {
  id: "market-microscope-20260707",
  brand: {
    colors: {
      background: "#020C17",
      surface: "#061523",
      text: "#F7F8FA",
      textMuted: "#9AA5B1",
      accent: "#19E6F2",
      success: "#4DDA78",
      warning: "#FF9A3D",
      error: "#FF5353",
    },
    fonts: {
      heading: {
        family: "Artwork embedded",
        file: "fonts/embedded.woff2",
        weight: 700,
      },
      body: {
        family: "Artwork embedded",
        file: "fonts/embedded.woff2",
        weight: 400,
      },
      fallback: "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
    logo: {
      preferred: "logos/embedded-in-artwork.png",
      minimumWidthPx: 0,
      clearSpacePx: 0,
    },
    style: {
      description:
        "Dark financial HUD, restrained data motion, crisp cyan scanning accents",
      borderRadiusPx: 20,
      shadow: "0 0 36px rgba(25, 230, 242, 0.22)",
      transitionFrames: 16,
    },
  },
  layout: { safeAreaPercent: { top: 0, right: 0, bottom: 0, left: 0 } },
  audio: {
    integratedLufs: -14,
    truePeakDbtp: -1,
    musicUnderVoiceDb: -18,
    defaultFadeFrames: 0,
  },
  exportProfiles: {
    vertical: {
      width: 1080,
      height: 1920,
      fps: 30,
      codec: "h264",
      container: "mp4",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      output: "out/market-microscope-20260707-01-v001.mp4",
    },
  },
};

export default config;
