import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";

const C = { bg: "#010A14", cyan: "#1CDCF3", red: "#FF4B50", green: "#43D665" };
const FONT = "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type Region = {
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  mode?: "up" | "line" | "bar" | "center";
};
type Roll = {
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  value: number;
  decimals: number;
  suffix?: string;
  color: string;
  size: number;
};

const RegionReveal: React.FC<{ src: string; region: Region }> = ({
  src,
  region,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(
    frame,
    [region.delay, region.delay + (region.mode === "line" ? 28 : 14)],
    [0, 1],
    { ...clamp, easing: Easing.out(Easing.cubic) },
  );
  const enter = spring({
    frame: frame - region.delay,
    fps: 30,
    config: { damping: 20, stiffness: 150, mass: 0.7 },
  });
  const clip =
    region.mode === "line"
      ? `inset(0 ${(1 - p) * 100}% 0 0)`
      : region.mode === "bar"
        ? `inset(${(1 - p) * 100}% 0 0 0)`
        : region.mode === "center"
          ? `inset(0 ${(1 - p) * 50}% 0 ${(1 - p) * 50}%)`
          : "none";
  return (
    <div
      style={{
        position: "absolute",
        left: region.x,
        top: region.y,
        width: region.w,
        height: region.h,
        overflow: "hidden",
        opacity: p,
        clipPath: clip,
        transform:
          region.mode === "up"
            ? `translateY(${(1 - enter) * 22}px)`
            : undefined,
      }}
    >
      <Img
        src={src}
        style={{
          position: "absolute",
          left: -region.x,
          top: -region.y,
          width: 1080,
          height: 1920,
          maxWidth: "none",
        }}
      />
    </div>
  );
};

const RollPatch: React.FC<{ item: Roll }> = ({ item }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [item.delay, item.delay + 22], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const visible = interpolate(
    frame,
    [item.delay, item.delay + 2],
    [0, 1],
    clamp,
  );
  const handoff = interpolate(frame, [149, 150], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.bg,
        opacity: visible * handoff,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          color: item.color,
          fontSize: item.size,
          fontWeight: 750,
          fontVariantNumeric: "tabular-nums",
          textShadow: `0 0 20px ${item.color}66`,
          filter: `blur(${(1 - p) * 4}px)`,
        }}
      >
        {(item.value * p).toFixed(item.decimals)}
        {item.suffix}
      </span>
    </div>
  );
};

const AnimatedPage: React.FC<{
  image: string;
  regions: Region[];
  rolls: Roll[];
}> = ({ image, regions, rolls }) => {
  const frame = useCurrentFrame();
  const src = staticFile(`projects/daily-close-20260821/images/${image}.png`);
  const header = interpolate(frame, [0, 12], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const finalLock = interpolate(frame, [149, 150], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: 1080,
          height: 1920,
          opacity: header,
          filter: `brightness(${0.35 + header * 0.65})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 225,
          bottom: 0,
          background: C.bg,
          opacity: 0.985,
        }}
      />
      {regions.map((r, i) => (
        <RegionReveal key={`${r.x}-${r.y}-${i}`} src={src} region={r} />
      ))}
      {rolls.map((r, i) => (
        <RollPatch key={`${r.value}-${i}`} item={r} />
      ))}
      <Img
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: 1080,
          height: 1920,
          opacity: finalLock,
        }}
      />
    </AbsoluteFill>
  );
};

const p2: Region[] = [
  { x: 50, y: 260, w: 468, h: 385, delay: 18, mode: "up" },
  { x: 560, y: 260, w: 468, h: 385, delay: 18, mode: "up" },
  { x: 120, y: 640, w: 840, h: 660, delay: 48, mode: "center" },
  { x: 50, y: 1450, w: 470, h: 330, delay: 108, mode: "up" },
  { x: 560, y: 1450, w: 470, h: 330, delay: 116, mode: "up" },
  { x: 45, y: 1800, w: 990, h: 95, delay: 140, mode: "up" },
];
const p3: Region[] = [
  { x: 45, y: 255, w: 480, h: 530, delay: 18, mode: "up" },
  { x: 535, y: 255, w: 495, h: 265, delay: 48, mode: "up" },
  { x: 535, y: 530, w: 495, h: 255, delay: 60, mode: "up" },
  { x: 45, y: 805, w: 985, h: 380, delay: 78, mode: "up" },
  { x: 45, y: 1205, w: 985, h: 520, delay: 105, mode: "up" },
  { x: 68, y: 1310, w: 900, h: 350, delay: 112, mode: "bar" },
  { x: 68, y: 1280, w: 900, h: 300, delay: 119, mode: "line" },
  { x: 45, y: 1740, w: 985, h: 120, delay: 145, mode: "up" },
];
const p3r: Roll[] = [
  {
    x: 85,
    y: 360,
    w: 380,
    h: 190,
    delay: 22,
    value: 1.89,
    decimals: 2,
    color: "#BDEFFF",
    size: 150,
  },
  {
    x: 585,
    y: 355,
    w: 330,
    h: 120,
    delay: 52,
    value: 2.09,
    decimals: 2,
    color: C.cyan,
    size: 105,
  },
  {
    x: 690,
    y: 630,
    w: 270,
    h: 120,
    delay: 65,
    value: 9.62,
    decimals: 2,
    suffix: "%",
    color: C.red,
    size: 92,
  },
];
const p4: Region[] = [
  { x: 165, y: 250, w: 750, h: 130, delay: 16, mode: "up" },
  { x: 38, y: 390, w: 490, h: 980, delay: 30, mode: "up" },
  { x: 535, y: 390, w: 505, h: 980, delay: 34, mode: "up" },
  { x: 58, y: 510, w: 450, h: 250, delay: 40, mode: "line" },
  { x: 58, y: 790, w: 450, h: 250, delay: 51, mode: "line" },
  { x: 58, y: 1070, w: 450, h: 250, delay: 62, mode: "line" },
  { x: 555, y: 510, w: 450, h: 250, delay: 45, mode: "line" },
  { x: 555, y: 790, w: 450, h: 250, delay: 56, mode: "line" },
  { x: 555, y: 1070, w: 450, h: 250, delay: 67, mode: "line" },
  { x: 38, y: 1390, w: 1000, h: 490, delay: 105, mode: "center" },
];
const p5: Region[] = [
  { x: 45, y: 255, w: 475, h: 420, delay: 18, mode: "up" },
  { x: 545, y: 255, w: 480, h: 420, delay: 26, mode: "up" },
  { x: 55, y: 530, w: 440, h: 120, delay: 35, mode: "line" },
  { x: 580, y: 530, w: 420, h: 120, delay: 43, mode: "line" },
  { x: 45, y: 700, w: 985, h: 155, delay: 62, mode: "up" },
  { x: 45, y: 875, w: 985, h: 125, delay: 72, mode: "up" },
  { x: 45, y: 1020, w: 475, h: 290, delay: 88, mode: "up" },
  { x: 545, y: 1020, w: 480, h: 290, delay: 98, mode: "up" },
  { x: 45, y: 1335, w: 985, h: 400, delay: 116, mode: "up" },
  { x: 320, y: 1430, w: 180, h: 250, delay: 124, mode: "line" },
  { x: 715, y: 1430, w: 275, h: 250, delay: 130, mode: "line" },
  { x: 45, y: 1770, w: 985, h: 100, delay: 146, mode: "up" },
];
const p5r: Roll[] = [
  {
    x: 78,
    y: 370,
    w: 390,
    h: 110,
    delay: 23,
    value: 1653.56,
    decimals: 2,
    color: C.red,
    size: 82,
  },
  {
    x: 585,
    y: 370,
    w: 380,
    h: 110,
    delay: 31,
    value: 1956.85,
    decimals: 2,
    color: C.green,
    size: 82,
  },
  {
    x: 520,
    y: 735,
    w: 390,
    h: 90,
    delay: 66,
    value: 2922.27,
    decimals: 2,
    color: "#BDEFFF",
    size: 72,
  },
  {
    x: 690,
    y: 900,
    w: 200,
    h: 85,
    delay: 76,
    value: 276,
    decimals: 0,
    color: C.red,
    size: 72,
  },
  {
    x: 80,
    y: 1180,
    w: 260,
    h: 95,
    delay: 93,
    value: 161.08,
    decimals: 2,
    color: C.red,
    size: 68,
  },
  {
    x: 585,
    y: 1180,
    w: 260,
    h: 95,
    delay: 103,
    value: 42.62,
    decimals: 2,
    suffix: "%",
    color: C.red,
    size: 68,
  },
];
const p6: Region[] = [
  { x: 300, y: 245, w: 500, h: 100, delay: 16, mode: "up" },
  { x: 45, y: 355, w: 310, h: 535, delay: 28, mode: "up" },
  { x: 380, y: 355, w: 310, h: 535, delay: 39, mode: "up" },
  { x: 715, y: 355, w: 310, h: 535, delay: 50, mode: "up" },
  { x: 45, y: 915, w: 985, h: 205, delay: 82, mode: "up" },
  { x: 300, y: 1170, w: 500, h: 90, delay: 102, mode: "up" },
  { x: 45, y: 1260, w: 985, h: 140, delay: 112, mode: "up" },
  { x: 45, y: 1415, w: 985, h: 140, delay: 121, mode: "up" },
  { x: 45, y: 1570, w: 985, h: 140, delay: 130, mode: "up" },
  { x: 45, y: 1740, w: 985, h: 120, delay: 145, mode: "up" },
];
const p6r: Roll[] = [
  {
    x: 410,
    y: 585,
    w: 260,
    h: 120,
    delay: 44,
    value: 1.89,
    decimals: 2,
    color: "#BDEFFF",
    size: 92,
  },
  {
    x: 745,
    y: 590,
    w: 250,
    h: 110,
    delay: 55,
    value: 46.67,
    decimals: 2,
    suffix: "%",
    color: C.green,
    size: 72,
  },
];

export const DailyCloseP2: React.FC = () => (
  <AnimatedPage image="02" regions={p2} rolls={[]} />
);
export const DailyCloseP3: React.FC = () => (
  <AnimatedPage image="03" regions={p3} rolls={p3r} />
);
export const DailyCloseP4: React.FC = () => (
  <AnimatedPage image="04" regions={p4} rolls={[]} />
);
export const DailyCloseP5: React.FC = () => (
  <AnimatedPage image="05" regions={p5} rolls={p5r} />
);
export const DailyCloseP6: React.FC = () => (
  <AnimatedPage image="06" regions={p6} rolls={p6r} />
);
