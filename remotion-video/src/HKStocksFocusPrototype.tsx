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
  hkStocksFocus20260828 as d,
  type FocusStock,
} from "./data/hkStocksFocus20260828";
const C = config.brand.colors;
const FONT = config.brand.fonts.fallback;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const Count: React.FC<{ n: number; delay: number; digits?: number }> = ({
  n,
  delay,
  digits = 2,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay + 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return <>{(n * p).toFixed(digits)}</>;
};
const SideBars: React.FC<{ positive: boolean; delay: number }> = ({
  positive,
  delay,
}) => {
  const f = useCurrentFrame();
  const vals = [22, 34, 46, 42, 60, 71, 66, 83, 100];
  const color = positive ? C.success : C.error;
  return (
    <div
      style={{
        height: 195,
        display: "flex",
        alignItems: positive ? "end" : "start",
        gap: 8,
        transform: positive ? "none" : "scaleY(-1)",
      }}
    >
      {vals.map((v, i) => {
        const p = interpolate(
          f,
          [delay + i * 3, delay + 24 + i * 3],
          [0, 1],
          clamp,
        );
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${v * p}%`,
              background: `linear-gradient(transparent,${color})`,
              boxShadow: `0 0 9px ${color}88`,
            }}
          />
        );
      })}
    </div>
  );
};
const ListCard: React.FC<{
  title: string;
  items: readonly FocusStock[];
  color: string;
  delay: number;
  turnover?: boolean;
}> = ({ title, items, color, delay, turnover = false }) => {
  const f = useCurrentFrame();
  const enter = spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 18, stiffness: 125 },
  });
  const max = Math.max(
    ...items.map((x) => x.turnoverBillion ?? Math.abs(x.changePct)),
  );
  return (
    <div
      style={{
        height: 420,
        border: "1px solid rgba(43,130,188,.65)",
        borderRadius: 20,
        background:
          "linear-gradient(145deg,rgba(4,21,42,.96),rgba(2,12,27,.94))",
        boxShadow: `inset 0 0 38px ${color}09`,
        padding: "22px 28px",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 28}px)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 31, color, fontWeight: 850 }}>{title}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: turnover
            ? "55px 145px 190px 150px 100px"
            : "55px 155px 220px 120px",
          gap: 16,
          color: C.textMuted,
          fontSize: 17,
          marginTop: 12,
        }}
      >
        <span>排名</span>
        <span>代码</span>
        <span>名称</span>
        {turnover && <span>成交额(亿)</span>}
        <span>{turnover ? "涨跌幅" : "涨幅"}</span>
      </div>
      <div style={{ marginTop: 5 }}>
        {items.map((x, i) => {
          const p = interpolate(
            f,
            [delay + 14 + i * 6, delay + 35 + i * 6],
            [0, 1],
            clamp,
          );
          const rowTone = x.changePct >= 0 ? C.success : C.error;
          return (
            <div
              key={x.code}
              style={{
                height: 59,
                display: "grid",
                gridTemplateColumns: turnover
                  ? "55px 145px 190px 150px 100px"
                  : "55px 155px 220px 120px",
                gap: 16,
                alignItems: "center",
                fontSize: 21,
                opacity: p,
                transform: `translateX(${(1 - p) * -28}px)`,
              }}
            >
              <b>{x.rank}</b>
              <span>{x.code}</span>
              <span>{x.name}</span>
              {turnover && (
                <span style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: -8,
                      height: 5,
                      borderRadius: 4,
                      width: `${((x.turnoverBillion ?? 0) / max) * 120 * p}px`,
                      background: C.accent,
                      boxShadow: `0 0 7px ${C.accent}`,
                    }}
                  />
                  <Count
                    n={(x.turnoverBillion ?? 0) * 10}
                    delay={delay + 20 + i * 6}
                  />
                </span>
              )}
              <b style={{ color: rowTone }}>
                {x.changePct >= 0 ? "+" : ""}
                <Count n={x.changePct} delay={delay + 20 + i * 6} />%
              </b>
            </div>
          );
        })}
      </div>
      {!turnover && (
        <div
          style={{
            position: "absolute",
            right: 26,
            bottom: 30,
            width: 185,
            height: 195,
            opacity: 0.78,
          }}
        >
          <SideBars positive={color === C.success} delay={delay + 30} />
        </div>
      )}
    </div>
  );
};
export const HKStocksFocusPrototype: React.FC = () => {
  const f = useCurrentFrame();
  const head = spring({ frame: f - 5, fps: 30, config: { damping: 18 } });
  const ticker = d.internationalTicker;
  return (
    <AbsoluteFill
      style={{
        background: C.background,
        color: C.text,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(
          "projects/hk-market-close/images/world-map-hk-skyline.png",
        )}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center bottom",
          opacity: 0.78,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(rgba(1,7,18,.96) 0%,rgba(1,7,18,.92) 70%,rgba(1,7,18,.22) 88%,rgba(1,7,18,.5) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 43,
          opacity: head,
          transform: `translateY(${(1 - head) * -22}px)`,
        }}
      >
        <div style={{ fontSize: 70, fontWeight: 850, letterSpacing: 5 }}>
          个股焦点
        </div>
        <div style={{ fontSize: 29, letterSpacing: 3 }}>STOCKS IN FOCUS</div>
        <div style={{ fontSize: 24, color: "#b6c7da", marginTop: 17 }}>
          {d.tradeDate} {d.weekday}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 36,
          right: 36,
          top: 245,
          display: "grid",
          gap: 14,
        }}
      >
        <ListCard
          title="涨幅 TOP 5"
          items={d.gainers}
          color={C.success}
          delay={22}
        />
        <ListCard
          title="跌幅 TOP 5"
          items={d.losers}
          color={C.error}
          delay={57}
        />
        <ListCard
          title="成交额 TOP 5"
          items={d.turnover}
          color={C.accent}
          delay={92}
          turnover
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          bottom: 28,
          height: 86,
          border: "1px solid rgba(43,130,188,.7)",
          borderRadius: 18,
          background: "rgba(2,13,29,.9)",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          alignItems: "center",
          padding: "0 18px",
          gap: 12,
        }}
      >
        {ticker.map((x, i) => {
          const p = spring({
            frame: f - 145 - i * 7,
            fps: 30,
            config: { damping: 16 },
          });
          return (
            <div
              key={x.name}
              style={{
                borderRight: i < 3 ? "1px solid rgba(120,160,190,.25)" : "none",
                opacity: p,
                transform: `translateY(${(1 - p) * 12}px)`,
              }}
            >
              <div style={{ fontSize: 17 }}>{x.name}</div>
              <div
                style={{
                  fontSize: 16,
                  color: x.changePct >= 0 ? C.success : C.error,
                }}
              >
                {x.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {x.changePct >= 0 ? "+" : ""}
                {x.changePct.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 38,
          bottom: 127,
          fontSize: 14,
          color: C.textMuted,
        }}
      >
        来源：HKEJ Stock360 · ET Net | 2026-09-07 16:10
      </div>
    </AbsoluteFill>
  );
};
