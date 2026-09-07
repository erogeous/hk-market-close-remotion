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
  gold: "#FFB343",
};
const F = "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif",
  clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const p = (f: number, s: number, d = 14) =>
  interpolate(f, [s, s + d], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
const Num: React.FC<{
  v: number;
  d?: number;
  s: number;
  color?: string;
  size?: number;
  suf?: string;
}> = ({ v, d = 0, s, color = C.cyan, size = 72, suf = "" }) => {
  const f = useCurrentFrame(),
    q = p(f, s, 24);
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: 780,
        fontVariantNumeric: "tabular-nums",
        textShadow: `0 0 18px ${color}55`,
      }}
    >
      {(v * q).toFixed(d)}
      {suf}
    </span>
  );
};
const Page: React.FC<{ n: string; sub: string; children: React.ReactNode }> = ({
  n,
  sub,
  children,
}) => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(circle at 50% 45%,#061B31,#010A14 60%,#000710)",
      fontFamily: F,
      color: C.text,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.18,
        backgroundImage:
          "linear-gradient(#0C3455 1px,transparent 1px),linear-gradient(90deg,#0C3455 1px,transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 50,
        top: 42,
        fontSize: 82,
        fontWeight: 800,
      }}
    >
      每日收盘
    </div>
    <div style={{ position: "absolute", right: 52, top: 62 }}>
      <b style={{ fontSize: 70, color: C.cyan }}>{n}</b>
      <span style={{ fontSize: 42, color: C.muted }}>/06</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 52,
        top: 162,
        fontSize: 40,
        color: "#BDEFFF",
      }}
    >
      2026.08.21 <span style={{ color: C.text }}>{sub}</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 52,
        right: 52,
        top: 148,
        height: 2,
        background: `linear-gradient(90deg,${C.cyan},transparent,${C.cyan})`,
      }}
    />
    {children}
  </AbsoluteFill>
);
const In: React.FC<{
  s: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ s, children, style }) => {
  const f = useCurrentFrame(),
    q = spring({
      frame: f - s,
      fps: 30,
      config: { damping: 20, stiffness: 145, mass: 0.7 },
    });
  return (
    <div
      style={{
        opacity: q,
        transform: `translateY(${(1 - q) * 22}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
const Panel: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = C.cyan, style }) => (
  <div
    style={{
      border: `2px solid ${color}88`,
      borderRadius: 22,
      background: `radial-gradient(circle at 50% 30%,${color}12,${C.panel} 68%)`,
      ...style,
    }}
  >
    {children}
  </div>
);
const Spark: React.FC<{ s: number; color: string; down?: boolean }> = ({
  s,
  color,
  down,
}) => {
  const f = useCurrentFrame(),
    q = p(f, s, 28),
    pts = down
      ? "0,15 35,28 70,24 105,42 140,38 175,57 210,52 250,78"
      : "0,78 35,62 70,69 105,45 140,50 175,30 210,38 250,10";
  return (
    <svg width="250" height="90" viewBox="0 0 250 90">
      <defs>
        <clipPath id={`c${s}`}>
          <rect width={250 * q} height="90" />
        </clipPath>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="4"
        clipPath={`url(#c${s})`}
      />
    </svg>
  );
};

export const DailyCloseP3Rebuilt: React.FC = () => {
  const f = useCurrentFrame();
  const wave = p(f, 28, 28);
  const vals = [2.17, 2.55, 2.14, 2.39, 2.53, 2.09, 1.89];
  return (
    <Page n="03" sub="量能变化">
      <In s={14} style={{ position: "absolute", left: 48, top: 270 }}>
        <Panel style={{ width: 480, height: 500, padding: 38 }}>
          <div style={{ fontSize: 42 }}>今日成交额</div>
          <div>
            <Num v={1.89} d={2} s={18} color="#BDEFFF" size={132} />
            <span style={{ fontSize: 36, whiteSpace: "nowrap" }}>万亿元</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 300,
              width: 240,
              height: 120,
              borderRadius: "50%",
              border: `3px solid ${C.cyan}`,
              transform: `scale(${0.7 + wave * 0.6})`,
              opacity: 1 - wave,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 145,
              top: 325,
              width: 190,
              height: 90,
              borderRadius: "50%",
              border: `2px solid ${C.cyan}`,
              transform: `scale(${0.7 + wave * 0.9})`,
              opacity: 1 - wave,
            }}
          />
        </Panel>
      </In>
      <In s={45} style={{ position: "absolute", left: 550, top: 270 }}>
        <Panel style={{ width: 480, height: 230, padding: 38 }}>
          <div style={{ fontSize: 39 }}>昨日成交额</div>
          <Num v={2.09} d={2} s={50} size={92} />
          <span style={{ fontSize: 35 }}> 万亿元</span>
        </Panel>
      </In>
      <In s={63} style={{ position: "absolute", left: 550, top: 520 }}>
        <Panel color={C.red} style={{ width: 480, height: 250, padding: 38 }}>
          <div
            style={{
              fontSize: 54,
              color: C.red,
              transform: `translateY(${(1 - p(f, 63)) * -20}px)`,
            }}
          >
            ↓
          </div>
          <span style={{ fontSize: 40 }}>缩量 </span>
          <Num v={9.62} d={2} s={69} color={C.red} size={82} suf="%" />
        </Panel>
      </In>
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 800,
          width: 984,
          height: 280,
          display: "flex",
          gap: 16,
        }}
      >
        {[
          ["沪市", 8834],
          ["深市", 9958],
          ["北证", 131],
        ].map((x, i) => (
          <In key={String(x[0])} s={82 + i * 8} style={{ flex: 1 }}>
            <Panel style={{ height: 240, textAlign: "center", paddingTop: 35 }}>
              <div style={{ fontSize: 42 }}>{x[0]}</div>
              <Num v={Number(x[1])} s={88 + i * 8} size={72} />
              <div style={{ fontSize: 32 }}>亿元</div>
            </Panel>
          </In>
        ))}
      </div>
      <Panel
        style={{
          position: "absolute",
          left: 48,
          top: 1110,
          width: 984,
          height: 600,
          padding: 28,
        }}
      >
        <div style={{ fontSize: 40 }}>近7期成交额趋势</div>
        <svg width="930" height="450" viewBox="0 0 930 450">
          {vals.map((v, i) => {
            const q = p(f, 108 + i * 4, 14),
              h = (v / 2.7) * 300,
              x = 55 + i * 130;
            return (
              <g key={i} opacity={i === 6 ? 1 : 0.62}>
                <rect
                  x={x}
                  y={390 - h * q}
                  width="62"
                  height={h * q}
                  fill={i === 6 ? C.cyan : "#1670C5"}
                />
                <text
                  x={x + 31}
                  y={420}
                  fill={C.text}
                  fontSize="28"
                  textAnchor="middle"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          <polyline
            points={vals
              .map((v, i) => `${86 + i * 130},${390 - (v / 2.7) * 300}`)
              .join(" ")}
            fill="none"
            stroke={C.cyan}
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset={1000 * (1 - p(f, 137, 25))}
          />
          {vals.map((v, i) => (
            <circle
              key={i}
              cx={86 + i * 130}
              cy={390 - (v / 2.7) * 300}
              r={i === 6 ? 11 : 7}
              fill={i === 6 ? "#fff" : C.cyan}
              opacity={p(f, 137 + i * 3, 6)}
            />
          ))}
        </svg>
      </Panel>
    </Page>
  );
};

const RankCard: React.FC<{
  x: number;
  y: number;
  name: string;
  color: string;
  down?: boolean;
  s: number;
}> = ({ x, y, name, color, down, s }) => (
  <In s={s} style={{ position: "absolute", left: x, top: y }}>
    <Panel color={color} style={{ width: 470, height: 220, padding: 25 }}>
      <div style={{ fontSize: 43, fontWeight: 700 }}>{name}</div>
      <div style={{ position: "absolute", right: 24, bottom: 18 }}>
        <Spark s={s + 7} color={color} down={down} />
      </div>
    </Panel>
  </In>
);
export const DailyCloseP4Rebuilt: React.FC = () => {
  const f = useCurrentFrame(),
    scan = p(f, 12, 22);
  return (
    <Page n="04" sub="热点板块">
      <div
        style={{
          position: "absolute",
          top: 255,
          left: 170,
          right: 170,
          textAlign: "center",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        今天什么最热？
      </div>
      <div
        style={{
          position: "absolute",
          top: 345,
          left: 100 + scan * 800,
          width: 120,
          height: 4,
          background: C.cyan,
          boxShadow: `0 0 20px ${C.cyan}`,
          opacity: Math.min(scan * 4, (1 - scan) * 4),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 390,
          left: 55,
          fontSize: 42,
          color: C.red,
        }}
      >
        领涨方向 TOP3
      </div>
      <div
        style={{
          position: "absolute",
          top: 390,
          left: 565,
          fontSize: 42,
          color: C.green,
        }}
      >
        领跌方向 TOP3
      </div>
      {["01  锂", "02  贵金属", "03  钨"].map((n, i) => (
        <RankCard
          key={n}
          x={50}
          y={455 + i * 240}
          name={n}
          color={C.red}
          s={30 + i * 11}
        />
      ))}
      {["01  种子生产", "02  粮食种植", "03  医疗研发外包"].map((n, i) => (
        <RankCard
          key={n}
          x={560}
          y={455 + i * 240}
          name={n}
          color={C.green}
          down
          s={37 + i * 11}
        />
      ))}
      <In s={105} style={{ position: "absolute", left: 50, top: 1200 }}>
        <Panel style={{ width: 980, height: 580, padding: 28 }}>
          <div style={{ fontSize: 48, textAlign: "center" }}>
            <span style={{ color: C.red }}>资源链偏强</span> /{" "}
            <span style={{ color: C.green }}>农业医药偏弱</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8,1fr)",
              gap: 8,
              marginTop: 45,
            }}
          >
            {Array.from({ length: 56 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 54,
                  background: i < 28 ? C.red : C.green,
                  opacity: 0.12 + p(f, 108 + i * 0.5, 18) * 0.65,
                  borderRadius: 5,
                }}
              />
            ))}
          </div>
        </Panel>
      </In>
    </Page>
  );
};

export const DailyCloseP5Rebuilt: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Page n="05" sub="个股焦点">
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 270,
          width: 984,
          height: 360,
          display: "flex",
          gap: 25,
        }}
      >
        {[
          ["科创50", 1653.56, C.red, 18],
          ["科创综指", 1956.85, C.green, 38],
        ].map((a, i) => (
          <In key={String(a[0])} s={Number(a[3])} style={{ flex: 1 }}>
            <Panel color={String(a[2])} style={{ height: 330, padding: 28 }}>
              <div style={{ fontSize: 43 }}>{a[0]}</div>
              <Num
                v={Number(a[1])}
                d={2}
                s={Number(a[3]) + 5}
                color={String(a[2])}
                size={82}
              />
              <Spark
                s={Number(a[3]) + 18}
                color={String(a[2])}
                down={i === 1}
              />
            </Panel>
          </In>
        ))}
      </div>
      <In s={62} style={{ position: "absolute", left: 48, top: 650 }}>
        <Panel style={{ width: 984, height: 150, padding: 30 }}>
          <span style={{ fontSize: 40 }}>科创板成交额 </span>
          <Num v={2922.27} d={2} s={66} size={75} />
          <span style={{ fontSize: 34 }}>亿元</span>
        </Panel>
      </In>
      <In s={77} style={{ position: "absolute", left: 48, top: 820 }}>
        <Panel color={C.red} style={{ width: 984, height: 125, padding: 25 }}>
          <span style={{ fontSize: 40 }}>上涨个股 </span>
          <Num v={276} s={81} color={C.red} size={68} />
          <span style={{ fontSize: 42, color: C.muted }}> / 615</span>
        </Panel>
      </In>
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 970,
          width: 984,
          height: 300,
          display: "flex",
          gap: 25,
        }}
      >
        <In s={91} style={{ flex: 1 }}>
          <Panel color={C.red} style={{ height: 275, padding: 28 }}>
            <div style={{ fontSize: 35 }}>成交额第一</div>
            <div style={{ fontSize: 46, marginTop: 20 }}>长鑫科技</div>
            <Num v={161.08} d={2} s={97} color={C.red} size={70} />
            <span>亿元</span>
          </Panel>
        </In>
        <In s={105} style={{ flex: 1 }}>
          <Panel style={{ height: 275, padding: 28 }}>
            <div style={{ fontSize: 35 }}>换手率第一</div>
            <div style={{ fontSize: 46, marginTop: 20 }}>国仪公司</div>
            <Num v={42.62} d={2} s={111} color={C.red} size={70} suf="%" />
            <div
              style={{
                position: "absolute",
                right: 40,
                top: 90,
                fontSize: 82,
                color: C.cyan,
                transform: `rotate(${p(f, 105, 28) * 360}deg)`,
              }}
            >
              ↻
            </div>
          </Panel>
        </In>
      </div>
      <Panel
        style={{
          position: "absolute",
          left: 48,
          top: 1300,
          width: 984,
          height: 470,
          padding: 28,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "55%" }}>
            <div style={{ color: C.red, fontSize: 36 }}>涨幅居前</div>
            {["康希诺", "近岸蛋白", "键凯科技", "深科达"].map((n, i) => (
              <In
                key={n}
                s={125 + i * 7}
                style={{
                  height: 82,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 36,
                  borderBottom: "1px solid #17405B",
                }}
              >
                <span style={{ width: 190 }}>
                  {i + 1} {n}
                </span>
                <Spark s={130 + i * 7} color={C.red} />
              </In>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              borderLeft: "1px solid #176387",
              paddingLeft: 28,
            }}
          >
            <div style={{ color: C.green, fontSize: 36 }}>跌幅居首</div>
            <In s={137} style={{ fontSize: 38, marginTop: 35 }}>
              圣湘生物 <span style={{ color: C.green }}>-9.57%</span>
              <Spark s={143} color={C.green} down />
            </In>
          </div>
        </div>
      </Panel>
    </Page>
  );
};

export const DailyCloseP6Rebuilt: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    ["三大指数", "收红", C.red, 15],
    ["成交额", "1.89万亿元", C.cyan, 23],
    ["赚钱效应", "46.67%", C.green, 31],
  ];
  return (
    <Page n="06" sub="收盘结论">
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 300,
          width: 984,
          height: 430,
          display: "flex",
          gap: 20,
        }}
      >
        {cards.map((a) => (
          <In key={String(a[0])} s={Number(a[3])} style={{ flex: 1 }}>
            <Panel
              color={String(a[2])}
              style={{ height: 400, padding: 25, textAlign: "center" }}
            >
              <div style={{ fontSize: 38, marginTop: 55 }}>{a[0]}</div>
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 760,
                  color: String(a[2]),
                  marginTop: 55,
                }}
              >
                {a[1]}
              </div>
            </Panel>
          </In>
        ))}
      </div>
      <In s={62} style={{ position: "absolute", left: 48, top: 760 }}>
        <Panel color={C.gold} style={{ width: 984, height: 190, padding: 34 }}>
          <span style={{ fontSize: 72, color: C.gold }}>♨</span>
          <span style={{ fontSize: 42, marginLeft: 28 }}>热点集中：</span>
          {["锂", "贵金属", "钨"].map((x, i) => (
            <span
              key={x}
              style={{
                fontSize: 50,
                color: C.gold,
                marginLeft: 35,
                opacity: p(frame, 68 + i * 7),
              }}
            >
              {x}
            </span>
          ))}
        </Panel>
      </In>
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 55,
          color: "#BDEFFF",
        }}
      >
        明日观察
      </div>
      {[
        ["01", "成交额能否重回2万亿以上"],
        ["02", "资源链热点能否持续"],
        ["03", "赚钱效应能否回到50%上方"],
      ].map((a, i) => (
        <In
          key={a[0]}
          s={94 + i * 10}
          style={{ position: "absolute", left: 48, top: 1090 + i * 170 }}
        >
          <Panel style={{ width: 984, height: 145, padding: 35 }}>
            <span style={{ fontSize: 48, color: C.cyan, fontWeight: 750 }}>
              {a[0]}
            </span>
            <span style={{ fontSize: 38, marginLeft: 45 }}>{a[1]}</span>
          </Panel>
        </In>
      ))}
      <In
        s={140}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 48,
          height: 110,
          textAlign: "center",
          fontSize: 39,
          borderTop: `1px solid ${C.cyan}`,
          paddingTop: 30,
        }}
      >
        指数修复，量能回落，继续看主线持续性
      </In>
    </Page>
  );
};
