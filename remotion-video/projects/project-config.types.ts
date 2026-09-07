export type HexColor = `#${string}`;

export type FontRole = {
  family: string;
  file: `fonts/${string}`;
  weight: number;
  style?: "normal" | "italic";
};

export type ExportProfile = {
  width: number;
  height: number;
  fps: number;
  codec: "h264" | "h265" | "vp8" | "vp9" | "prores";
  container: "mp4" | "webm" | "mov";
  pixelFormat: "yuv420p" | "yuv422p10le" | "yuva444p10le";
  audioCodec: "aac" | "pcm-16" | "opus";
  output: `out/${string}`;
};

export type VideoProjectConfig = {
  id: string;
  brand: {
    colors: {
      background: HexColor;
      surface: HexColor;
      text: HexColor;
      textMuted: HexColor;
      accent: HexColor;
      success: HexColor;
      warning: HexColor;
      error: HexColor;
    };
    fonts: {
      heading: FontRole;
      body: FontRole;
      fallback: string;
    };
    logo: {
      preferred: `logos/${string}`;
      onDark?: `logos/${string}`;
      onLight?: `logos/${string}`;
      minimumWidthPx: number;
      clearSpacePx: number;
    };
    style: {
      description: string;
      borderRadiusPx: number;
      shadow: string;
      transitionFrames: number;
    };
  };
  layout: {
    safeAreaPercent: {top: number; right: number; bottom: number; left: number};
  };
  audio: {
    integratedLufs: number;
    truePeakDbtp: number;
    musicUnderVoiceDb: number;
    defaultFadeFrames: number;
  };
  exportProfiles: Record<string, ExportProfile>;
};

