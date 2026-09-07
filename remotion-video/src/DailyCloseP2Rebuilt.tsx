import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
const C = {
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
const prog = (f: number, s: number, d: number) =>
  interpolate(f, [s, s + d], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
const Counter: React.FC<{
  to: number;
  decimals?: number;
  start: number;
  duration?: number;
  color: string;
  size: number;
  suffix?: string;
}> = ({ to, decimals = 0, start, duration = 24, color, size, suffix = "" }) => {
  const f = useCurrentFrame(),
    p = prog(f, start, duration);
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: 780,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: -3,
        textShadow: `0 0 22px ${color}55`,
      }}
    >
      {(to * p).toFixed(decimals)}
      {suffix}
    </span>
  );
};

const Header: React.FC = () => {
  const f = useCurrentFrame(),
    a = prog(f, 0, 12),
    b = prog(f, 10, 12);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 42,
          color: C.text,
          fontSize: 84,
          fontWeight: 800,
          opacity: a,
          transform: `translateY(${(1 - a) * 16}px)`,
        }}
      >
        每日收盘
      </div>
      <div style={{ position: "absolute", right: 55, top: 65, opacity: a }}>
        <span style={{ fontSize: 72, color: C.cyan, fontWeight: 750 }}>02</span>
        <span style={{ fontSize: 43, color: C.muted }}>/06</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 164,
          color: "#BDEFFF",
          fontSize: 42,
          opacity: b,
        }}
      >
        2026.08.21 <span style={{ color: C.text }}>赚钱效应</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 52,
          right: 52,
          top: 148,
          height: 2,
          background: `linear-gradient(90deg,${C.cyan}88,transparent 45%,${C.cyan}88)`,
          opacity: a,
        }}
      />
    </>
  );
};

const BreadthCard: React.FC<{
  x: number;
  title: string;
  value: number;
  color: string;
  start: number;
  down?: boolean;
}> = ({ x, title, value, color, start, down }) => {
  const f = useCurrentFrame(),
    e = spring({
      frame: f - start,
      fps: 30,
      config: { damping: 20, stiffness: 145, mass: 0.7 },
    });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 270,
        width: 470,
        height: 390,
        border: `2px solid ${color}BB`,
        borderRadius: 22,
        background: `radial-gradient(circle at 50% 35%,${color}14,${C.panel} 64%,#020F1C)`,
        opacity: e,
        transform: `translateY(${(1 - e) * 22}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 38,
          transform: "translateX(-50%)",
          width: 72,
          height: 72,
          border: `2px solid ${color}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          fontSize: 42,
        }}
      >
        {down ? "↘" : "↗"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 132,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 49,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: 205,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Counter to={value} start={start + 7} color={color} size={112} />
      </div>
    </div>
  );
};

const DotField: React.FC = () => {
  const f = useCurrentFrame(),
    cols = 18;
  const side = (right: boolean, color: string, start: number) =>
    Array.from({ length: cols }).map((_, col) => {
      const h = Math.max(2, Math.round(3 + Math.pow(col / cols, 1.9) * 13)),
        p = prog(f, start + col * 1.25, 8);
      return Array.from({ length: h }).map((__, row) => (
        <div
          key={`${right}-${col}-${row}`}
          style={{
            position: "absolute",
            left: right ? 554 + col * 28 : 512 - col * 28,
            top: 1390 - row * 24,
            width: 14,
            height: 14,
            borderRadius: 4,
            background: color,
            opacity: p * 0.95,
            boxShadow: `0 0 10px ${color}55`,
            transform: `scale(${p})`,
          }}
        />
      ));
    });
  return (
    <>
      {side(false, C.red, 55)}
      {side(true, C.green, 62)}
    </>
  );
};

const Gauge: React.FC = () => {
  const f = useCurrentFrame(),
    e = prog(f, 72, 12),
    p = prog(f, 80, 34),
    glow = interpolate(f, [113, 117, 123], [0, 1, 0], clamp),
    angle = -90 + 180 * 0.4667 * p;
  return (
    <div
      style={{
        position: "absolute",
        left: 115,
        top: 640,
        width: 850,
        height: 700,
        opacity: e,
        filter: `drop-shadow(0 0 ${12 + glow * 18}px ${C.cyan}66)`,
      }}
    >
      <svg
        width="850"
        height="500"
        viewBox="0 0 850 500"
        style={{ position: "absolute", top: 20 }}
      >
        <path
          d="M100 430 A325 325 0 0 1 750 430"
          fill="none"
          stroke="#183248"
          strokeWidth="48"
        />
        <path
          d="M100 430 A325 325 0 0 1 425 105"
          fill="none"
          stroke={C.red}
          strokeWidth="48"
        />
        <path
          d="M425 105 A325 325 0 0 1 750 430"
          fill="none"
          stroke={C.green}
          strokeWidth="48"
        />
        <circle
          cx="425"
          cy="430"
          r="255"
          fill="#020B16"
          stroke="#1370A0"
          strokeWidth="2"
        />
        <path
          d="M100 430 A325 325 0 0 1 750 430"
          pathLength="100"
          fill="none"
          stroke="#C7F5FF"
          strokeWidth="5"
          strokeDasharray={`${p * 46.67} 100`}
          strokeLinecap="round"
        />
        <g transform={`rotate(${angle} 425 430)`}>
          <line
            x1="425"
            y1="430"
            x2="425"
            y2="104"
            stroke={C.cyan}
            strokeWidth="6"
          />
          <polygon points="425,90 414,118 436,118" fill={C.cyan} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 245,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 43,
        }}
      >
        市场赚钱效应
      </div>
      <div
        style={{
          position: "absolute",
          top: 325,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Counter
          to={46.67}
          decimals={2}
          start={80}
          duration={34}
          color="#BDEFFF"
          size={115}
          suffix="%"
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 470,
          color: C.muted,
          fontSize: 38,
        }}
      >
        0%
      </div>
      <div
        style={{
          position: "absolute",
          left: 390,
          top: 470,
          color: C.muted,
          fontSize: 38,
        }}
      >
        50%
      </div>
      <div
        style={{
          position: "absolute",
          right: 85,
          top: 470,
          color: C.muted,
          fontSize: 38,
        }}
      >
        100%
      </div>
    </div>
  );
};

const LimitCard: React.FC<{
  x: number;
  title: string;
  value: number;
  color: string;
  start: number;
  glyph: string;
}> = ({ x, title, value, color, start, glyph }) => {
  const f = useCurrentFrame(),
    e = spring({
      frame: f - start,
      fps: 30,
      config: { damping: 20, stiffness: 140, mass: 0.72 },
    });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 1450,
        width: 470,
        height: 310,
        border: `2px solid ${color}99`,
        borderRadius: 22,
        background: `radial-gradient(circle at 50% 70%,${color}18,${C.panel} 68%)`,
        opacity: e,
        transform: `translateY(${(1 - e) * 28}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 45,
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          fontSize: 54,
          fontWeight: 750,
        }}
      >
        {glyph}
      </div>
      <div
        style={{
          position: "absolute",
          left: 185,
          top: 46,
          color: C.text,
          fontSize: 44,
        }}
      >
        {title}
      </div>
      <div style={{ position: "absolute", left: 180, top: 105 }}>
        <Counter to={value} start={start + 6} color={color} size={105} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 50,
          right: 50,
          bottom: 35,
          height: 2,
          background: `linear-gradient(90deg,transparent,${color},transparent)`,
          boxShadow: `0 0 16px ${color}`,
        }}
      />
    </div>
  );
};

export const DailyCloseP2Rebuilt: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(circle at 50% 45%,#061B31 0%,#010A14 58%,#000710 100%)",
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.22,
        backgroundImage:
          "linear-gradient(#0C3455 1px,transparent 1px),linear-gradient(90deg,#0C3455 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    />
    <Header />
    <BreadthCard
      x={50}
      title="上涨家数"
      value={2505}
      color={C.red}
      start={22}
    />
    <BreadthCard
      x={560}
      title="下跌家数"
      value={2862}
      color={C.green}
      start={22}
      down
    />
    <Gauge />
    <DotField />
    <LimitCard
      x={50}
      title="涨停"
      value={57}
      color={C.red}
      start={122}
      glyph="涨"
    />
    <LimitCard
      x={560}
      title="跌停"
      value={14}
      color={C.green}
      start={130}
      glyph="跌"
    />
    <div
      style={{
        position: "absolute",
        left: 55,
        right: 55,
        bottom: 45,
        height: 86,
        borderTop: `1px solid ${C.cyan}66`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.text,
        fontSize: 38,
      }}
    >
      指数收红，但下跌家数仍略多
    </div>
  </AbsoluteFill>
);
