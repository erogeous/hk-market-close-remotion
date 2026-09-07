import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";

const COLORS = {
  bg: "#010A14",
  panel: "#031526",
  text: "#F7F8FA",
  muted: "#9BA8B8",
  cyan: "#1CDCF3",
  red: "#FF4B50",
  green: "#43D665",
};
const FONT = "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const RollingValue: React.FC<{
  value: number;
  decimals: number;
  delay: number;
  color: string;
  size: number;
  suffix?: string;
}> = ({ value, decimals, delay, color, size, suffix = "" }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 23], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const settle = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 17, stiffness: 160, mass: 0.65 },
  });
  return (
    <span
      style={{
        display: "inline-block",
        color,
        fontSize: size,
        fontWeight: 750,
        fontFamily: FONT,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: -2,
        opacity: p,
        transform: `translateY(${(1 - settle) * 26}px)`,
        filter: `blur(${(1 - p) * 5}px)`,
        textShadow: `0 0 22px ${color}44`,
      }}
    >
      {(value * p).toFixed(decimals)}
      {suffix}
    </span>
  );
};

const LineChart: React.FC<{
  points: number[];
  delay: number;
  color: string;
}> = ({ points, delay, color }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 30], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const width = 420;
  const height = 128;
  const step = width / (points.length - 1);
  const line = points.map((v, i) => `${i * step},${v}`).join(" ");
  const area = `M0 ${height} L ${points.map((v, i) => `${i * step} ${v}`).join(" L ")} L${width} ${height}Z`;
  const id = `line-${delay}`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <rect width={width * p} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-c)`}>
        <path d={area} fill={`url(#${id}-g)`} />
        <polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </g>
    </svg>
  );
};

type IndexCardProps = {
  x: number;
  y: number;
  title: string;
  value: number;
  percent: number;
  delay: number;
  positive: boolean;
  points: number[];
};
const IndexCard: React.FC<IndexCardProps> = ({
  x,
  y,
  title,
  value,
  percent,
  delay,
  positive,
  points,
}) => {
  const frame = useCurrentFrame();
  const entrance = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 18, stiffness: 125, mass: 0.72 },
  });
  const color = positive ? COLORS.red : COLORS.green;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 472,
        height: 390,
        border: `2px solid ${positive ? "#275AA4" : "#146170"}`,
        borderRadius: 22,
        background:
          "radial-gradient(circle at 50% 30%, #082343 0%, #031526 58%, #02101D 100%)",
        boxShadow: `inset 0 0 32px ${color}10, 0 0 18px rgba(18,108,205,0.12)`,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 28}px)`,
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 30,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: 50,
            border: `2px solid ${color}`,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          ↗
        </div>
        <div style={{ fontSize: 39, fontWeight: 650, color: COLORS.text }}>
          {title}
        </div>
      </div>
      <div style={{ position: "absolute", left: 36, top: 105 }}>
        <RollingValue
          value={value}
          decimals={2}
          delay={delay + 5}
          color={color}
          size={70}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 39,
          top: 205,
          color,
          fontSize: 38,
          fontWeight: 750,
        }}
      >
        {positive ? "+" : ""}
        <RollingValue
          value={percent}
          decimals={2}
          delay={delay + 13}
          color={color}
          size={38}
          suffix="%"
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 30,
          right: 30,
          bottom: 24,
          height: 130,
        }}
      >
        <LineChart points={points} delay={delay + 20} color={color} />
      </div>
    </div>
  );
};

const MarketTotal: React.FC = () => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - 88,
    fps: 30,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  const ring = interpolate(frame, [88, 145], [-25, 240], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 42,
        top: 1138,
        width: 996,
        height: 334,
        border: `2px solid #147DCF`,
        borderRadius: 18,
        background:
          "radial-gradient(circle at 72% 52%, #062B55 0%, #031628 38%, #02101D 75%)",
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 54,
          top: 45,
          color: COLORS.text,
          fontSize: 39,
        }}
      >
        今日全市场成交
      </div>
      <div style={{ position: "absolute", left: 52, top: 112 }}>
        <RollingValue
          value={1.89}
          decimals={2}
          delay={93}
          color="#BDEFFF"
          size={115}
        />
        <span style={{ color: COLORS.text, fontSize: 49, marginLeft: 20 }}>
          万亿元
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 50,
          width: 230,
          height: 230,
          borderRadius: "50%",
          border: `3px solid ${COLORS.cyan}`,
          boxShadow: `0 0 35px ${COLORS.cyan}77, inset 0 0 30px #0879D488`,
          transform: `rotate(${ring}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: "50%",
            border: "3px dashed #1A7FFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 62,
            borderRadius: "50%",
            border: `2px solid ${COLORS.cyan}`,
          }}
        />
      </div>
    </div>
  );
};

const MarketBreakdown: React.FC = () => {
  const items = [
    { label: "沪市", value: 8834, glyph: "沪", delay: 108 },
    { label: "深市", value: 9958, glyph: "深", delay: 116 },
    { label: "北证", value: 131, glyph: "北", delay: 124 },
  ];
  const frame = useCurrentFrame();
  const panelOpacity = interpolate(frame, [101, 108], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 42,
        top: 1492,
        width: 996,
        height: 300,
        border: "2px solid #155486",
        borderRadius: 22,
        background: "linear-gradient(180deg, #03192D, #02101D)",
        display: "flex",
        fontFamily: FONT,
        opacity: panelOpacity,
      }}
    >
      {items.map((item, index) => {
        const p = spring({
          frame: frame - item.delay,
          fps: 30,
          config: { damping: 17, stiffness: 140, mass: 0.65 },
        });
        return (
          <div
            key={item.label}
            style={{
              position: "relative",
              flex: 1,
              borderLeft: index ? "1px solid #176387" : "none",
              textAlign: "center",
              opacity: p,
              transform: `translateY(${(1 - p) * 18}px)`,
            }}
          >
            <div
              style={{
                margin: "30px auto 8px",
                width: 82,
                height: 82,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.cyan,
                fontSize: 35,
                border: `2px solid ${COLORS.cyan}`,
                boxShadow: `0 0 24px ${COLORS.cyan}66`,
              }}
            >
              {item.glyph}
            </div>
            <div style={{ color: COLORS.text, fontSize: 34 }}>{item.label}</div>
            <div style={{ marginTop: 8 }}>
              <RollingValue
                value={item.value}
                decimals={0}
                delay={item.delay + 5}
                color={COLORS.cyan}
                size={55}
              />
              <span style={{ color: COLORS.text, fontSize: 29 }}>亿元</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const DailyCloseAnimated: React.FC = () => {
  const frame = useCurrentFrame();
  const framework = interpolate(frame, [0, 13], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <Img
        src={staticFile("projects/daily-close-20260821/images/01.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: framework,
          filter: `brightness(${0.4 + framework * 0.6})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 245,
          width: 1012,
          height: 875,
          background: COLORS.bg,
          opacity: 0.98,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 1120,
          width: 1012,
          height: 690,
          background: COLORS.bg,
          opacity: 0.98,
        }}
      />
      <IndexCard
        x={46}
        y={258}
        title="上证指数"
        value={3905.2}
        percent={0.04}
        positive
        delay={18}
        points={[
          98, 75, 86, 102, 112, 92, 78, 85, 70, 76, 62, 47, 58, 43, 31, 46, 39,
          22,
        ]}
      />
      <IndexCard
        x={562}
        y={258}
        title="深证成指"
        value={14094.17}
        percent={0.87}
        positive
        delay={27}
        points={[
          100, 78, 86, 105, 93, 82, 75, 84, 69, 72, 64, 58, 47, 55, 42, 51, 28,
          18,
        ]}
      />
      <IndexCard
        x={46}
        y={696}
        title="创业板指"
        value={3545.58}
        percent={1.43}
        positive
        delay={36}
        points={[
          102, 85, 94, 110, 96, 91, 80, 75, 69, 58, 64, 50, 43, 35, 48, 37, 22,
          8,
        ]}
      />
      <IndexCard
        x={562}
        y={696}
        title="北证50"
        value={1075.38}
        percent={-0.57}
        positive={false}
        delay={45}
        points={[
          28, 42, 48, 55, 50, 58, 52, 61, 57, 70, 66, 75, 72, 88, 97, 105, 96,
          84,
        ]}
      />
      <MarketTotal />
      <MarketBreakdown />
    </AbsoluteFill>
  );
};
