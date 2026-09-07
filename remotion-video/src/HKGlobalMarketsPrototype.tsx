import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import config from "../projects/hk-market-close/project.config";
import {
  hkMarketClose20260828,
  type CompactMarketItem,
  type GlobalMarketItem,
} from "./data/hkMarketClose20260828";

const {colors} = config.brand;
const FONT = config.brand.fonts.fallback;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const regionGlyph: Record<string, string> = {US: "US", JP: "JP", HK: "HK"};

const CountUp: React.FC<{value: number; delay: number; decimals?: number}> = ({
  value,
  delay,
  decimals = 2,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 34], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <>{(value * progress).toLocaleString("en-US", {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}</>
  );
};

const Sparkline: React.FC<{
  points: readonly number[];
  positive: boolean;
  delay: number;
}> = ({points, positive, delay}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 40], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const width = 315;
  const height = 92;
  const step = width / (points.length - 1);
  const path = points.map((point, index) => `${index * step},${point}`).join(" ");
  const tone = positive ? colors.success : colors.error;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`fill-${delay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone} stopOpacity="0.3" />
          <stop offset="1" stopColor={tone} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`clip-${delay}`}>
          <rect x="0" y="0" width={width * progress} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${delay})`}>
        <polygon points={`0,92 ${path} 315,92`} fill={`url(#fill-${delay})`} />
        <polyline
          points={path}
          fill="none"
          stroke={tone}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{filter: `drop-shadow(0 0 7px ${tone})`}}
        />
      </g>
    </svg>
  );
};

const MarketCard: React.FC<{item: GlobalMarketItem; index: number}> = ({
  item,
  index,
}) => {
  const frame = useCurrentFrame();
  const delay = 38 + index * 7;
  const entrance = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 18, stiffness: 135, mass: 0.7},
  });
  const positive = item.changePct >= 0;
  const tone = positive ? colors.success : colors.error;
  return (
    <div
      style={{
        position: "relative",
        height: 228,
        padding: "17px 18px",
        borderRadius: config.brand.style.borderRadiusPx,
        border: `1px solid ${positive ? "#185C53" : "#743446"}`,
        background: "linear-gradient(145deg, rgba(7,26,48,0.96), rgba(3,14,29,0.96))",
        boxShadow: `inset 0 0 42px ${tone}0D, ${config.brand.style.shadow}`,
        overflow: "hidden",
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 34}px) scale(${0.98 + entrance * 0.02})`,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 14}}>
        <div
          style={{
            width: 45,
            height: 32,
            borderRadius: 9,
            border: `1px solid ${tone}88`,
            color: tone,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {regionGlyph[item.region]}
        </div>
        <div>
          <div style={{fontSize: 24, fontWeight: 750, color: colors.text}}>{item.name}</div>
          <div style={{fontSize: 13, letterSpacing: 0.8, color: colors.textMuted}}>{item.english}</div>
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          color: colors.text,
          fontSize: 37,
          lineHeight: 1,
          fontWeight: 680,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: -1,
        }}
      >
        <CountUp value={item.close} delay={delay + 8} />
      </div>
      <div style={{marginTop: 10, color: tone, fontSize: 22, fontWeight: 700}}>
        {positive ? "▲" : "▼"} {positive ? "+" : ""}
        <CountUp value={item.changePct} delay={delay + 17} />%
      </div>
      <div style={{position: "absolute", right: 14, bottom: 12, width: 145, height: 60}}>
        <Sparkline points={item.spark} positive={positive} delay={delay + 23} />
      </div>
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -40,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: tone,
          opacity: 0.035,
          filter: "blur(18px)",
        }}
      />
    </div>
  );
};

const CompactCard: React.FC<{
  item: CompactMarketItem;
  index: number;
  delayBase: number;
  tall?: boolean;
}> = ({item, index, delayBase, tall = false}) => {
  const frame = useCurrentFrame();
  const delay = delayBase + index * 6;
  const entrance = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 19, stiffness: 140, mass: 0.68},
  });
  const positive = item.changePct >= 0;
  const tone = positive ? colors.success : colors.error;
  return (
    <div
      style={{
        height: tall ? 184 : 156,
        borderRadius: 18,
        border: "1px solid rgba(53,133,183,0.48)",
        background: "linear-gradient(145deg, rgba(7,26,48,0.96), rgba(3,14,29,0.96))",
        boxShadow: `inset 0 0 30px ${tone}0A`,
        padding: tall ? "19px 20px" : "15px 20px",
        position: "relative",
        overflow: "hidden",
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 26}px)`,
      }}
    >
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div>
          <div style={{fontSize: tall ? 24 : 23, fontWeight: 720}}>{item.name}</div>
          <div style={{fontSize: 13, color: colors.textMuted, letterSpacing: 1}}>{item.english}</div>
        </div>
        <div
          style={{
            border: `1px solid ${tone}88`,
            color: tone,
            borderRadius: 999,
            minWidth: 49,
            height: 34,
            padding: "0 9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          {item.glyph}
        </div>
      </div>
      <div
        style={{
          marginTop: tall ? 18 : 11,
          fontSize: tall ? 37 : 34,
          fontWeight: 750,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <CountUp value={item.value} decimals={item.decimals} delay={delay + 8} />
        {item.unit ? <span style={{fontSize: 14, marginLeft: 7, color: colors.textMuted}}>{item.unit}</span> : null}
      </div>
      <div style={{position: "absolute", right: 20, bottom: tall ? 20 : 15, color: tone, fontSize: 21, fontWeight: 750}}>
        {positive ? "▲ +" : "▼ "}
        <CountUp value={item.changePct} delay={delay + 15} />%
      </div>
      <div style={{position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tone}88, transparent)`, opacity: entrance * 0.7}} />
    </div>
  );
};

const SectionLabel: React.FC<{children: React.ReactNode; top: number; delay: number}> = ({children, top, delay}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [delay, delay + 14], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 47,
        top,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * -18}px)`,
        fontSize: 24,
        fontWeight: 760,
        letterSpacing: 1,
      }}
    >
      <span style={{width: 6, height: 28, borderRadius: 6, background: colors.accent, boxShadow: `0 0 14px ${colors.accent}`}} />
      {children}
    </div>
  );
};

export const HKGlobalMarketsPrototype: React.FC = () => {
  const frame = useCurrentFrame();
  const header = spring({frame: frame - 8, fps: 30, config: {damping: 18, stiffness: 120}});
  const scanY = interpolate(frame, [0, 125], [-60, 1940], clamp);
  return (
    <AbsoluteFill style={{background: colors.background, color: colors.text, fontFamily: FONT, overflow: "hidden"}}>
      <Img
        src={staticFile("projects/hk-market-close/images/world-map-hk-skyline.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.88,
        }}
      />
      <AbsoluteFill style={{background: "rgba(1, 8, 20, 0.14)"}} />

      <div
        style={{
          position: "absolute",
          left: 58,
          right: 58,
          top: 44,
          opacity: header,
          transform: `translateY(${(1 - header) * -28}px)`,
          textAlign: "center",
        }}
      >
        <div style={{fontSize: 83, lineHeight: 1, fontWeight: 850, letterSpacing: 8, textShadow: "0 0 28px rgba(39,200,255,0.18)"}}>
          环球市场
        </div>
        <div style={{marginTop: 12, color: colors.accent, fontSize: 29, letterSpacing: 9}}>GLOBAL MARKETS</div>
        <div style={{marginTop: 13, color: colors.text, fontSize: 28, letterSpacing: 2}}>
          {hkMarketClose20260828.tradeDate} · {hkMarketClose20260828.weekday}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 46,
          right: 46,
          top: 470,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {hkMarketClose20260828.indices.map((item, index) => (
          <MarketCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <SectionLabel top={958} delay={76}>外汇市场</SectionLabel>
      <div
        style={{
          position: "absolute",
          left: 46,
          right: 46,
          top: 1001,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {hkMarketClose20260828.fx.map((item, index) => (
          <CompactCard key={item.id} item={item} index={index} delayBase={82} />
        ))}
      </div>

      <SectionLabel top={1186} delay={92}>其他市场</SectionLabel>
      <div
        style={{
          position: "absolute",
          left: 46,
          right: 46,
          top: 1229,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {hkMarketClose20260828.alternatives.map((item, index) => (
          <CompactCard key={item.id} item={item} index={index} delayBase={98} tall />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 31,
          display: "flex",
          justifyContent: "space-between",
          color: colors.textMuted,
          fontSize: 17,
          letterSpacing: 0.5,
        }}
      >
        <span>◷ {hkMarketClose20260828.generatedLabel}</span>
        <span>收盘值已核验 · 曲线为动效示意 · 原型 v005</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          boxShadow: `0 0 22px ${colors.accent}`,
          opacity: frame < 130 ? 0.42 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
