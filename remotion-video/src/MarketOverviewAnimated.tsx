import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";

const GREEN = "#4DDA78";
const CYAN = "#32DDF4";
const PANEL = "#031421";
const FONT = "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CountUp: React.FC<{
  value: number;
  decimals: number;
  delay: number;
  suffix?: string;
  size: number;
  color?: string;
}> = ({ value, decimals, delay, suffix = "", size, color = GREEN }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const settle = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 16, stiffness: 145, mass: 0.65 },
  });
  return (
    <span
      style={{
        display: "inline-block",
        color,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: -2,
        opacity: progress,
        transform: `translateY(${(1 - settle) * 24}px)`,
        filter: `blur(${(1 - progress) * 5}px)`,
        textShadow: `0 0 24px ${color}33`,
      }}
    >
      {(value * progress).toFixed(decimals)}
      {suffix}
    </span>
  );
};

const AnimatedLineChart: React.FC<{ delay: number; points: number[] }> = ({
  delay,
  points,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 38], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const width = 390;
  const height = 142;
  const step = width / (points.length - 1);
  const polyline = points.map((p, i) => `${i * step},${p}`).join(" ");
  const area = `M 0 ${height} L ${points.map((p, i) => `${i * step} ${p}`).join(" L ")} L ${width} ${height} Z`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      {[28, 70, 112].map((y) => (
        <line
          key={y}
          x1="0"
          x2={width}
          y1={y}
          y2={y}
          stroke="#216078"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.65"
        />
      ))}
      <defs>
        <linearGradient id={`area-${delay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GREEN} stopOpacity="0.35" />
          <stop offset="1" stopColor={GREEN} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`reveal-${delay}`}>
          <rect width={width * progress} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#reveal-${delay})`}>
        <path d={area} fill={`url(#area-${delay})`} />
        <polyline
          points={polyline}
          fill="none"
          stroke="#66F28B"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 7px rgba(77,218,120,0.45))" }}
        />
      </g>
    </svg>
  );
};

type CardData = {
  x: number;
  y: number;
  value: number;
  percent: number;
  delay: number;
  points: number[];
};
const IndexCard: React.FC<CardData> = ({
  x,
  y,
  value,
  percent,
  delay,
  points,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 450,
        height: 350,
        background: `linear-gradient(145deg, ${PANEL}, #04111D)`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 28, top: 2 }}>
        <CountUp value={value} decimals={2} delay={delay + 6} size={67} />
      </div>
      <div style={{ position: "absolute", left: 34, top: 96 }}>
        <span style={{ color: GREEN, fontSize: 34, marginRight: 8 }}>▼</span>
        <CountUp
          value={percent}
          decimals={2}
          delay={delay + 17}
          suffix="%"
          size={39}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 176,
          height: 146,
        }}
      >
        <AnimatedLineChart delay={delay + 24} points={points} />
      </div>
    </div>
  );
};

const BarChart: React.FC = () => {
  const frame = useCurrentFrame();
  const values = [3.22, 3.01, 2.93, 2.76, 2.58];
  const dates = ["06.30", "07.01", "07.02", "07.03", "07.07"];
  return (
    <div
      style={{
        position: "absolute",
        left: 78,
        top: 1632,
        width: 924,
        height: 230,
        background: "linear-gradient(#041421, #03111D)",
        border: "1px solid #28637B",
        borderRadius: 16,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 30,
          marginTop: 14,
        }}
      >
        近期成交额变化{" "}
        <span style={{ fontSize: 22, color: "#B5B5B5" }}>（万亿）</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 38,
          height: 130,
          borderBottom: "2px solid #315264",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        {values.map((value, index) => {
          const grow = interpolate(
            frame,
            [62 + index * 6, 82 + index * 6],
            [0, 1],
            { ...clamp, easing: Easing.out(Easing.cubic) },
          );
          const barHeight = (value / 3.4) * 92 * grow;
          return (
            <div
              key={dates[index]}
              style={{
                position: "relative",
                width: 90,
                height: "100%",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 20,
                  width: 50,
                  height: barHeight,
                  background:
                    index === 4
                      ? "linear-gradient(#4CCBFF, #155E9E)"
                      : "linear-gradient(#69E892, #167348)",
                  boxShadow: `0 0 16px ${index === 4 ? CYAN : GREEN}55`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: barHeight + 5,
                  width: "100%",
                  color: index === 4 ? CYAN : "#D0D0D0",
                  fontSize: 21,
                  opacity: grow,
                }}
              >
                {value.toFixed(2)}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 137,
                  width: "100%",
                  color: "#AEB5BC",
                  fontSize: 22,
                }}
              >
                {dates[index]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MarketOverviewAnimated: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#020C17", overflow: "hidden" }}>
      <Img
        src={staticFile("projects/market-microscope-20260707/images/02.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 170,
          width: 700,
          height: 170,
          background: "#020E19",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          fontFamily: FONT,
        }}
      >
        {[..."市场概览"].map((character, index) => {
          const reveal = interpolate(
            frame,
            [6 + index * 5, 18 + index * 5],
            [0, 1],
            { ...clamp, easing: Easing.out(Easing.cubic) },
          );
          return (
            <span
              key={`${character}-${index}`}
              style={{
                color: "white",
                fontSize: 104,
                fontWeight: 800,
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * 26}px)`,
                filter: `blur(${(1 - reveal) * 8}px)`,
                textShadow: "0 0 24px rgba(255,255,255,0.15)",
              }}
            >
              {character}
            </span>
          );
        })}
      </div>
      <IndexCard
        x={66}
        y={500}
        value={3990.24}
        percent={-1.26}
        delay={28}
        points={[
          20, 37, 31, 55, 47, 71, 61, 79, 70, 88, 82, 101, 94, 112, 106, 127,
        ]}
      />
      <IndexCard
        x={564}
        y={500}
        value={15225.11}
        percent={-1.24}
        delay={34}
        points={[
          19, 34, 29, 49, 42, 65, 56, 74, 66, 84, 78, 96, 88, 108, 101, 124,
        ]}
      />
      <IndexCard
        x={66}
        y={995}
        value={3911.91}
        percent={-0.94}
        delay={40}
        points={[
          24, 38, 34, 52, 45, 61, 57, 72, 66, 82, 76, 91, 86, 103, 98, 118,
        ]}
      />
      <IndexCard
        x={564}
        y={995}
        value={2315.59}
        percent={-0.18}
        delay={46}
        points={[
          70, 64, 68, 62, 67, 71, 69, 73, 70, 74, 71, 75, 69, 66, 68, 64,
        ]}
      />
      <div
        style={{
          position: "absolute",
          left: 414,
          top: 1355,
          width: 560,
          height: 254,
          background: "linear-gradient(135deg, #041421, #03111D)",
          fontFamily: FONT,
          paddingLeft: 24,
          paddingTop: 10,
        }}
      >
        <div style={{ fontSize: 34, color: "white", marginBottom: 8 }}>
          两市成交额
        </div>
        <CountUp value={2.58} decimals={2} delay={54} size={88} color={CYAN} />
        <span style={{ fontSize: 54, color: "white", marginLeft: 10 }}>
          万亿
        </span>
        <div
          style={{
            borderTop: "2px solid #2A485A",
            marginTop: 16,
            paddingTop: 13,
            color: "#AAAAAA",
            fontSize: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 30,
          }}
        >
          <span>较前一日</span>
          <CountUp
            value={-5100}
            decimals={0}
            delay={62}
            suffix="亿"
            size={38}
          />
        </div>
      </div>
      <BarChart />
    </AbsoluteFill>
  );
};
