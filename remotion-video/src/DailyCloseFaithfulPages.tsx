import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import projectConfig from "../projects/daily-close-20260821/project.config";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const colors = projectConfig.brand.colors;

type Region = {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  draw?: boolean;
};
type NumberSpec = {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  value: number;
  decimals: number;
  color: string;
  size: number;
  prefix?: string;
  suffix?: string;
  unitSize?: number;
};

const RegionReveal: React.FC<{ src: string; region: Region }> = ({
  src,
  region,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [region.s, region.s + (region.draw ? 28 : 14)],
    [0, 1],
    {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    },
  );
  const enter = spring({
    frame: frame - region.s,
    fps: 30,
    config: { damping: 22, stiffness: 150, mass: 0.7 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: region.x,
        top: region.y,
        width: region.w,
        height: region.h,
        overflow: "hidden",
        opacity: progress,
        clipPath: region.draw
          ? `inset(0 ${(1 - progress) * 100}% 0 0)`
          : undefined,
        transform: region.draw
          ? undefined
          : `translateY(${(1 - enter) * 16}px)`,
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

const RollingNumber: React.FC<{ spec: NumberSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [spec.s, spec.s + 24], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const visible =
    interpolate(frame, [spec.s, spec.s + 2], [0, 1], clamp) *
    interpolate(frame, [149, 150], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: spec.x,
        top: spec.y,
        width: spec.w,
        height: spec.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: visible,
        background: `radial-gradient(circle at 50% 45%, ${colors.surface}, ${colors.background} 78%)`,
        fontFamily: projectConfig.brand.fonts.fallback,
      }}
    >
      <span
        style={{
          color: spec.color,
          fontSize: spec.size,
          fontWeight: 780,
          fontVariantNumeric: "tabular-nums",
          textShadow: `0 0 18px ${spec.color}66`,
        }}
      >
        {spec.prefix}
        {(spec.value * progress).toFixed(spec.decimals)}
      </span>
      {spec.suffix ? (
        <span
          style={{
            marginLeft: 10,
            color: spec.suffix === "%" ? spec.color : colors.text,
            fontSize: spec.unitSize ?? 32,
            fontWeight: 650,
            whiteSpace: "nowrap",
          }}
        >
          {spec.suffix}
        </span>
      ) : null}
    </div>
  );
};

const FaithfulPage: React.FC<{
  image: string;
  regions: Region[];
  numbers?: NumberSpec[];
}> = ({ image, regions, numbers = [] }) => {
  const frame = useCurrentFrame();
  const src = staticFile(`projects/daily-close-20260821/images/${image}.png`);
  const header = interpolate(frame, [0, 12], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: colors.background, overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: 1080,
          height: 1920,
          opacity: header,
          filter: `brightness(${0.4 + header * 0.6})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 225,
          bottom: 0,
          background: colors.background,
          opacity: 0.995,
        }}
      />
      {regions.map((region, index) => (
        <RegionReveal key={index} src={src} region={region} />
      ))}
      {numbers.map((spec, index) => (
        <RollingNumber key={index} spec={spec} />
      ))}
    </AbsoluteFill>
  );
};

export const DailyCloseP2Faithful: React.FC = () => (
  <FaithfulPage
    image="02"
    regions={[
      { x: 48, y: 255, w: 470, h: 390, s: 18 },
      { x: 560, y: 255, w: 470, h: 390, s: 18 },
      { x: 100, y: 625, w: 880, h: 805, s: 48 },
      { x: 48, y: 1450, w: 470, h: 315, s: 105 },
      { x: 560, y: 1450, w: 470, h: 315, s: 114 },
      { x: 45, y: 1775, w: 990, h: 100, s: 142 },
    ]}
    numbers={[
      {
        x: 90,
        y: 475,
        w: 385,
        h: 175,
        s: 24,
        value: 2505,
        decimals: 0,
        color: colors.error,
        size: 118,
      },
      {
        x: 610,
        y: 475,
        w: 370,
        h: 175,
        s: 24,
        value: 2862,
        decimals: 0,
        color: colors.success,
        size: 118,
      },
      {
        x: 300,
        y: 930,
        w: 500,
        h: 205,
        s: 60,
        value: 46.67,
        decimals: 2,
        color: "#BDEFFF",
        size: 118,
        suffix: "%",
        unitSize: 62,
      },
      {
        x: 215,
        y: 1570,
        w: 230,
        h: 125,
        s: 111,
        value: 57,
        decimals: 0,
        color: colors.error,
        size: 106,
      },
      {
        x: 725,
        y: 1570,
        w: 220,
        h: 125,
        s: 120,
        value: 14,
        decimals: 0,
        color: colors.success,
        size: 106,
      },
    ]}
  />
);

export const DailyCloseP3Faithful: React.FC = () => (
  <FaithfulPage
    image="03"
    regions={[
      { x: 45, y: 255, w: 480, h: 525, s: 16 },
      { x: 535, y: 255, w: 495, h: 265, s: 45 },
      { x: 535, y: 530, w: 495, h: 255, s: 62 },
      { x: 45, y: 805, w: 985, h: 375, s: 82 },
      { x: 45, y: 1200, w: 985, h: 520, s: 108 },
      { x: 70, y: 1310, w: 900, h: 330, s: 116, draw: true },
      { x: 45, y: 1740, w: 985, h: 120, s: 145 },
    ]}
    numbers={[
      {
        x: 85,
        y: 365,
        w: 405,
        h: 190,
        s: 20,
        value: 1.89,
        decimals: 2,
        color: "#BDEFFF",
        size: 150,
      },
      {
        x: 590,
        y: 365,
        w: 380,
        h: 120,
        s: 49,
        value: 2.09,
        decimals: 2,
        color: colors.accent,
        size: 92,
        suffix: "万亿元",
        unitSize: 34,
      },
      {
        x: 720,
        y: 635,
        w: 265,
        h: 110,
        s: 68,
        value: 9.62,
        decimals: 2,
        color: colors.error,
        size: 82,
        suffix: "%",
        unitSize: 52,
      },
      {
        x: 85,
        y: 1010,
        w: 255,
        h: 100,
        s: 87,
        value: 8834,
        decimals: 0,
        color: colors.accent,
        size: 70,
        suffix: "亿元",
        unitSize: 30,
      },
      {
        x: 410,
        y: 1010,
        w: 270,
        h: 100,
        s: 94,
        value: 9958,
        decimals: 0,
        color: colors.accent,
        size: 70,
        suffix: "亿元",
        unitSize: 30,
      },
      {
        x: 760,
        y: 1010,
        w: 220,
        h: 100,
        s: 101,
        value: 131,
        decimals: 0,
        color: colors.accent,
        size: 70,
        suffix: "亿元",
        unitSize: 30,
      },
    ]}
  />
);

export const DailyCloseP4Faithful: React.FC = () => (
  <FaithfulPage
    image="04"
    regions={[
      { x: 165, y: 250, w: 750, h: 130, s: 16, draw: true },
      { x: 35, y: 390, w: 490, h: 307, s: 35 },
      { x: 35, y: 692, w: 490, h: 266, s: 49 },
      { x: 35, y: 952, w: 490, h: 448, s: 63 },
      { x: 535, y: 390, w: 500, h: 307, s: 77 },
      { x: 535, y: 692, w: 500, h: 266, s: 91 },
      { x: 535, y: 952, w: 500, h: 448, s: 105 },
      { x: 35, y: 1380, w: 1000, h: 475, s: 125 },
      { x: 70, y: 1510, w: 940, h: 300, s: 132, draw: true },
    ]}
  />
);

export const DailyCloseP6Faithful: React.FC = () => (
  <FaithfulPage
    image="06"
    regions={[
      { x: 300, y: 260, w: 480, h: 85, s: 14, draw: true },
      { x: 45, y: 350, w: 310, h: 540, s: 18 },
      { x: 380, y: 350, w: 310, h: 540, s: 27 },
      { x: 715, y: 350, w: 315, h: 540, s: 36 },
      { x: 45, y: 915, w: 985, h: 210, s: 62 },
      { x: 300, y: 1160, w: 480, h: 90, s: 82, draw: true },
      { x: 45, y: 1260, w: 985, h: 140, s: 92 },
      { x: 45, y: 1410, w: 985, h: 140, s: 104 },
      { x: 45, y: 1560, w: 985, h: 140, s: 116 },
      { x: 45, y: 1730, w: 985, h: 130, s: 140 },
    ]}
    numbers={[
      {
        x: 405,
        y: 585,
        w: 260,
        h: 120,
        s: 31,
        value: 1.89,
        decimals: 2,
        color: "#BDEFFF",
        size: 95,
      },
      {
        x: 730,
        y: 585,
        w: 285,
        h: 155,
        s: 40,
        value: 46.67,
        decimals: 2,
        color: colors.success,
        size: 80,
        suffix: "%",
        unitSize: 48,
      },
    ]}
  />
);
