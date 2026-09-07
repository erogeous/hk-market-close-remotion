import type {VideoProjectConfig} from "../project-config.types";

const config: VideoProjectConfig = {
  id: "replace-me",
  brand: {
    colors: {
      background: "#0B0D12",
      surface: "#151923",
      text: "#F7F8FA",
      textMuted: "#A8B0BF",
      accent: "#5B8CFF",
      success: "#27C281",
      warning: "#F5B942",
      error: "#F05D5E",
    },
    fonts: {
      heading: {family: "Replace Me", file: "fonts/replace-me.woff2", weight: 700},
      body: {family: "Replace Me", file: "fonts/replace-me.woff2", weight: 400},
      fallback: "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
    logo: {
      preferred: "logos/logo-primary.svg",
      onDark: "logos/logo-light.svg",
      onLight: "logos/logo-dark.svg",
      minimumWidthPx: 96,
      clearSpacePx: 24,
    },
    style: {
      description: "Modern, clean, restrained, premium, information-first",
      borderRadiusPx: 24,
      shadow: "0 20px 60px rgba(0, 0, 0, 0.28)",
      transitionFrames: 18,
    },
  },
  layout: {
    safeAreaPercent: {top: 5, right: 5, bottom: 5, left: 5},
  },
  audio: {
    integratedLufs: -14,
    truePeakDbtp: -1,
    musicUnderVoiceDb: -18,
    defaultFadeFrames: 8,
  },
  exportProfiles: {
    landscape: {
      width: 1920,
      height: 1080,
      fps: 30,
      codec: "h264",
      container: "mp4",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      output: "out/replace-me-main-landscape-v001.mp4",
    },
    vertical: {
      width: 1080,
      height: 1920,
      fps: 30,
      codec: "h264",
      container: "mp4",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      output: "out/replace-me-main-vertical-v001.mp4",
    },
    square: {
      width: 1080,
      height: 1080,
      fps: 30,
      codec: "h264",
      container: "mp4",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      output: "out/replace-me-main-square-v001.mp4",
    },
  },
};

export default config;

