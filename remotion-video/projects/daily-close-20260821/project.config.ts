import type {VideoProjectConfig} from "../project-config.types";

const config: VideoProjectConfig = {
  id: "daily-close-20260821",
  brand: {
    colors: {
      background: "#010A14",
      surface: "#031526",
      text: "#F7F8FA",
      textMuted: "#9BA8B8",
      accent: "#1CDCF3",
      success: "#43D665",
      warning: "#FF9A3D",
      error: "#FF4B50",
    },
    fonts: {
      heading: {family: "System Chinese", file: "fonts/embedded.woff2", weight: 700},
      body: {family: "System Chinese", file: "fonts/embedded.woff2", weight: 400},
      fallback: "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
    logo: {preferred: "logos/embedded.png", minimumWidthPx: 0, clearSpacePx: 0},
    style: {
      description: "Dark blue financial HUD with red, green, and cyan data accents",
      borderRadiusPx: 22,
      shadow: "0 0 28px rgba(28,220,243,0.18)",
      transitionFrames: 12,
    },
  },
  layout: {safeAreaPercent: {top: 2, right: 2, bottom: 2, left: 2}},
  audio: {integratedLufs: -14, truePeakDbtp: -1, musicUnderVoiceDb: -18, defaultFadeFrames: 0},
  exportProfiles: {
    vertical: {
      width: 1080,
      height: 1920,
      fps: 30,
      codec: "h264",
      container: "mp4",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      output: "out/daily-close-20260821-01-v001.mp4",
    },
  },
};

export default config;

