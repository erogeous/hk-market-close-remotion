import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type R = {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  line?: boolean;
};
type N = {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  v: number;
  d: number;
  color: string;
  size: number;
  prefix?: string;
  suffix?: string;
  unitSize?: number;
};
const Roll: React.FC<{ n: N }> = ({ n }) => {
  const f = useCurrentFrame(),
    q = interpolate(f, [n.s, n.s + 24], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    }),
    show =
      interpolate(f, [n.s, n.s + 2], [0, 1], clamp) *
      interpolate(f, [149, 150], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: n.x,
        top: n.y,
        width: n.w,
        height: n.h,
        background:
          "radial-gradient(circle at 50% 45%,#08213B,#031526 76%,#02101D)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: show,
        overflow: "hidden",
        fontFamily: "Arial, 'PingFang SC', sans-serif",
      }}
    >
      <span
        style={{
          fontSize: n.size,
          fontWeight: 780,
          color: n.color,
          fontVariantNumeric: "tabular-nums",
          textShadow: `0 0 18px ${n.color}66`,
        }}
      >
        {n.prefix}
        {(n.v * q).toFixed(n.d)}
      </span>
      {n.suffix ? (
        <span
          style={{
            marginLeft: 12,
            color: n.suffix === "%" ? n.color : "#F7F8FA",
            fontSize: n.unitSize ?? 34,
            fontWeight: 650,
            whiteSpace: "nowrap",
          }}
        >
          {n.suffix}
        </span>
      ) : null}
    </div>
  );
};
const Crop: React.FC<{ src: string; r: R }> = ({ src, r }) => {
  const f = useCurrentFrame(),
    q = interpolate(f, [r.s, r.s + (r.line ? 28 : 14)], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    }),
    e = spring({
      frame: f - r.s,
      fps: 30,
      config: { damping: 20, stiffness: 145, mass: 0.7 },
    });
  return (
    <div
      style={{
        position: "absolute",
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        overflow: "hidden",
        opacity: q,
        clipPath: r.line ? `inset(0 ${(1 - q) * 100}% 0 0)` : undefined,
        transform: r.line ? undefined : `translateY(${(1 - e) * 18}px)`,
      }}
    >
      <Img
        src={src}
        style={{
          position: "absolute",
          left: -r.x,
          top: -r.y,
          width: 1080,
          height: 1920,
          maxWidth: "none",
        }}
      />
    </div>
  );
};
export const DailyCloseP5Faithful: React.FC = () => {
  const f = useCurrentFrame(),
    src = staticFile("projects/daily-close-20260821/images/05.png"),
    head = interpolate(f, [0, 12], [0, 1], clamp);
  const regions: R[] = [
    { x: 45, y: 255, w: 475, h: 420, s: 16 },
    { x: 545, y: 255, w: 480, h: 420, s: 36 },
    { x: 45, y: 700, w: 985, h: 155, s: 60 },
    { x: 45, y: 875, w: 985, h: 125, s: 72 },
    { x: 45, y: 1020, w: 475, h: 290, s: 88 },
    { x: 545, y: 1020, w: 480, h: 290, s: 102 },
    { x: 45, y: 1335, w: 985, h: 400, s: 118 },
    { x: 45, y: 1770, w: 985, h: 100, s: 145 },
  ];
  const lines: R[] = [
    { x: 70, y: 510, w: 420, h: 120, s: 29, line: true },
    { x: 580, y: 510, w: 420, h: 120, s: 49, line: true },
    { x: 340, y: 1430, w: 150, h: 260, s: 126, line: true },
    { x: 720, y: 1430, w: 275, h: 260, s: 136, line: true },
  ];
  const nums: N[] = [
    {
      x: 76,
      y: 370,
      w: 395,
      h: 108,
      s: 20,
      v: 1653.56,
      d: 2,
      color: "#FF4B50",
      size: 82,
    },
    {
      x: 80,
      y: 480,
      w: 230,
      h: 60,
      s: 27,
      v: 0.04,
      d: 2,
      color: "#FF4B50",
      size: 45,
      prefix: "+",
      suffix: "%",
    },
    {
      x: 580,
      y: 370,
      w: 400,
      h: 108,
      s: 40,
      v: 1956.85,
      d: 2,
      color: "#43D665",
      size: 82,
    },
    {
      x: 585,
      y: 480,
      w: 230,
      h: 60,
      s: 47,
      v: -0.05,
      d: 2,
      color: "#43D665",
      size: 45,
      suffix: "%",
    },
    {
      x: 500,
      y: 735,
      w: 480,
      h: 105,
      s: 64,
      v: 2922.27,
      d: 2,
      color: "#BDEFFF",
      size: 72,
      suffix: "亿元",
      unitSize: 30,
    },
    {
      x: 680,
      y: 895,
      w: 310,
      h: 90,
      s: 76,
      v: 276,
      d: 0,
      color: "#FF4B50",
      size: 72,
      suffix: "/ 615",
      unitSize: 45,
    },
    {
      x: 75,
      y: 1180,
      w: 350,
      h: 100,
      s: 93,
      v: 161.08,
      d: 2,
      color: "#FF4B50",
      size: 64,
      suffix: "亿元",
      unitSize: 30,
    },
    {
      x: 575,
      y: 1180,
      w: 300,
      h: 100,
      s: 107,
      v: 42.62,
      d: 2,
      color: "#FF4B50",
      size: 64,
      suffix: "%",
      unitSize: 64,
    },
  ];
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: 1080,
          height: 1920,
          opacity: head,
          filter: `brightness(${0.4 + head * 0.6})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 225,
          bottom: 0,
          background: "#010A14",
          opacity: 0.99,
        }}
      />
      {regions.map((r, i) => (
        <Crop key={i} src={src} r={r} />
      ))}
      <div
        style={{
          position: "absolute",
          left: 68,
          top: 505,
          width: 430,
          height: 125,
          background:
            "linear-gradient(180deg,#031526 15%,#031526 70%,transparent)",
          opacity: interpolate(f, [16, 28, 29], [0, 1, 0], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 575,
          top: 505,
          width: 430,
          height: 125,
          background:
            "linear-gradient(180deg,#031526 15%,#031526 70%,transparent)",
          opacity: interpolate(f, [36, 48, 49], [0, 1, 0], clamp),
        }}
      />
      {lines.map((r, i) => (
        <Crop key={`l${i}`} src={src} r={r} />
      ))}
      {nums.map((n, i) => (
        <Roll key={i} n={n} />
      ))}
    </AbsoluteFill>
  );
};
