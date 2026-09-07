import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Region = {
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
};

const PROJECT = "projects/market-microscope-20260707/images";
const shotFile = (shot: number) => `${shot < 10 ? "0" : ""}${shot}.png`;

const shotRegions: Record<number, Region[]> = {
  1: [
    { x: 1.5, y: 39.5, width: 97, height: 7.2, delay: 12 },
    { x: 1.5, y: 80.8, width: 31.6, height: 12.8, delay: 44 },
    { x: 34.4, y: 80.8, width: 29, height: 12.8, delay: 52 },
    { x: 64.8, y: 80.8, width: 33.8, height: 12.8, delay: 60 },
  ],
  2: [
    { x: 5.4, y: 20.6, width: 43.2, height: 24.5, delay: 8 },
    { x: 50.8, y: 20.6, width: 43.2, height: 24.5, delay: 16 },
    { x: 5.4, y: 46.2, width: 43.2, height: 24.3, delay: 24 },
    { x: 50.8, y: 46.2, width: 43.2, height: 24.3, delay: 32 },
    { x: 5.4, y: 71.5, width: 88.8, height: 24, delay: 48 },
  ],
  3: [
    { x: 2.8, y: 21, width: 93.2, height: 32.5, delay: 8 },
    { x: 2.8, y: 55.1, width: 22.4, height: 21, delay: 42 },
    { x: 26.5, y: 55.1, width: 22.4, height: 21, delay: 48 },
    { x: 50.1, y: 55.1, width: 22.4, height: 21, delay: 54 },
    { x: 73.6, y: 55.1, width: 22.4, height: 21, delay: 60 },
  ],
  4: [
    { x: 3, y: 21.1, width: 45.9, height: 55.8, delay: 10 },
    { x: 50.4, y: 21.1, width: 45.9, height: 55.8, delay: 22 },
    { x: 3, y: 77.9, width: 93, height: 17.2, delay: 52 },
  ],
  5: [
    { x: 3.8, y: 19.9, width: 92.2, height: 35.2, delay: 8 },
    { x: 3.8, y: 55.5, width: 67.2, height: 21.5, delay: 34 },
    { x: 3.8, y: 77.3, width: 92.2, height: 18.2, delay: 58 },
  ],
  6: [
    { x: 3.1, y: 31.2, width: 20, height: 15, delay: 8 },
    { x: 27.8, y: 31.2, width: 20, height: 15, delay: 18 },
    { x: 52.4, y: 31.2, width: 20, height: 15, delay: 28 },
    { x: 77.2, y: 31.2, width: 20, height: 15, delay: 38 },
    { x: 3.4, y: 52.8, width: 93, height: 41.5, delay: 50 },
  ],
  7: [
    { x: 23.5, y: 43.5, width: 31, height: 24, delay: 8 },
    { x: 26.5, y: 26.8, width: 24, height: 15, delay: 22 },
    { x: 0.5, y: 51.5, width: 24, height: 15, delay: 32 },
    { x: 55, y: 51.5, width: 24, height: 15, delay: 42 },
    { x: 26.5, y: 68.5, width: 24, height: 15, delay: 52 },
  ],
  8: [
    { x: 9, y: 25.5, width: 82, height: 42, delay: 8 },
    { x: 4.5, y: 72, width: 43.2, height: 17.4, delay: 50 },
    { x: 50.5, y: 72, width: 44, height: 17.4, delay: 60 },
  ],
  9: [
    { x: 6.2, y: 22.3, width: 87.5, height: 19.1, delay: 8 },
    { x: 6.2, y: 42.8, width: 87.5, height: 19.1, delay: 28 },
    { x: 6.2, y: 63.2, width: 87.5, height: 19.2, delay: 48 },
  ],
};

const CroppedImage: React.FC<{ shot: number; region: Region }> = ({
  shot,
  region,
}) => (
  <Img
    src={staticFile(`${PROJECT}/${shotFile(shot)}`)}
    style={{
      position: "absolute",
      width: `${10000 / region.width}%`,
      height: `${10000 / region.height}%`,
      left: `${(-region.x / region.width) * 100}%`,
      top: `${(-region.y / region.height) * 100}%`,
      objectFit: "fill",
      maxWidth: "none",
    }}
  />
);

const DataRegion: React.FC<{ shot: number; region: Region; index: number }> = ({
  shot,
  region,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - region.delay,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.65 },
  });
  const pulse = interpolate(
    Math.sin(((frame - region.delay) / fps) * Math.PI * 2),
    [-1, 1],
    [0, 1],
  );
  const scanProgress = interpolate(
    frame,
    [region.delay, region.delay + 32],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${region.x}%`,
        top: `${region.y}%`,
        width: `${region.width}%`,
        height: `${region.height}%`,
        overflow: "hidden",
        opacity: entrance,
        transform: `scale(${0.985 + entrance * 0.015})`,
        transformOrigin: "center",
        filter: `brightness(${1 + pulse * 0.08}) saturate(${1 + pulse * 0.12})`,
        boxShadow: `inset 0 0 ${20 + pulse * 28}px rgba(25,230,242,${0.05 + pulse * 0.08})`,
      }}
    >
      <CroppedImage shot={shot} region={region} />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${scanProgress * 116 - 8}%`,
          width: "8%",
          background:
            "linear-gradient(90deg, rgba(25,230,242,0), rgba(125,250,255,0.28), rgba(25,230,242,0))",
          filter: "blur(5px)",
          opacity: index % 2 === 0 ? 0.85 : 0.55,
        }}
      />
    </div>
  );
};

const HudSweep: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 119], [-20, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `${x}%`,
        width: "10%",
        background:
          "linear-gradient(90deg, transparent, rgba(25,230,242,0.07), transparent)",
        transform: "skewX(-8deg)",
        filter: "blur(9px)",
        mixBlendMode: "screen",
      }}
    />
  );
};

export const MarketMicroscope: React.FC<{ shot: number }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const baseEntrance = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const baseScale = interpolate(frame, [0, 119], [1.018, 1.004], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endFade = interpolate(frame, [110, 119], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const image = staticFile(`${PROJECT}/${shotFile(shot)}`);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020C17",
        overflow: "hidden",
        opacity: endFade,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${baseScale})`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: baseEntrance,
            filter: "contrast(1.02) saturate(1.03)",
          }}
        />
        {(shotRegions[shot] ?? []).map((region, index) => (
          <DataRegion
            key={`${shot}-${region.x}-${region.y}`}
            shot={shot}
            region={region}
            index={index}
          />
        ))}
      </AbsoluteFill>
      <HudSweep />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 90px rgba(0,0,0,0.22)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
