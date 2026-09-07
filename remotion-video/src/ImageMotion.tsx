import {zColor} from "@remotion/zod-types";
import {z} from "zod";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const motionPresets = [
  "zoom-in",
  "zoom-out",
  "pan-left",
  "pan-right",
  "pan-up",
  "pan-down",
  "drift",
] as const;

export const imageMotionSchema = z.object({
  imagePath: z
    .string()
    .describe("项目图片路径，例如 projects/acme/images/hero.jpg"),
  motion: z.enum(motionPresets).describe("动态效果"),
  durationSeconds: z.number().min(1).max(30).step(0.5).describe("时长（秒）"),
  aspectRatio: z.enum(["landscape", "vertical", "square"]).describe("画面比例"),
  fit: z.enum(["cover", "contain"]).describe("图片填充方式"),
  focusX: z.number().min(0).max(100).step(1).describe("焦点横向位置 %"),
  focusY: z.number().min(0).max(100).step(1).describe("焦点纵向位置 %"),
  intensity: z.number().min(0).max(1).step(0.05).describe("动态强度"),
  fadeFrames: z.number().int().min(0).max(30).describe("首尾淡化帧数"),
  backgroundColor: zColor().describe("背景颜色"),
  backgroundBlur: z.boolean().describe("使用图片模糊填充背景"),
  cornerRadius: z.number().min(0).max(120).step(2).describe("图片圆角"),
  showSafeArea: z.boolean().describe("显示剪辑安全区（导出前关闭）"),
});

export type ImageMotionProps = z.infer<typeof imageMotionSchema>;

const getMotionTransform = ({
  motion,
  progress,
  intensity,
}: Pick<ImageMotionProps, "motion" | "intensity"> & {progress: number}) => {
  const zoom = 0.04 + intensity * 0.14;
  const travel = 2 + intensity * 8;
  const eased = Easing.inOut(Easing.quad)(progress);
  const fromTo = (from: number, to: number) => from + (to - from) * eased;

  switch (motion) {
    case "zoom-out":
      return {scale: fromTo(1 + zoom, 1), x: 0, y: 0, rotate: 0};
    case "pan-left":
      return {scale: 1 + zoom, x: fromTo(travel, -travel), y: 0, rotate: 0};
    case "pan-right":
      return {scale: 1 + zoom, x: fromTo(-travel, travel), y: 0, rotate: 0};
    case "pan-up":
      return {scale: 1 + zoom, x: 0, y: fromTo(travel, -travel), rotate: 0};
    case "pan-down":
      return {scale: 1 + zoom, x: 0, y: fromTo(-travel, travel), rotate: 0};
    case "drift":
      return {
        scale: fromTo(1 + zoom * 0.25, 1 + zoom),
        x: Math.sin(eased * Math.PI * 2) * travel * 0.3,
        y: fromTo(travel * 0.25, -travel * 0.25),
        rotate: fromTo(-0.3, 0.3) * intensity,
      };
    case "zoom-in":
    default:
      return {scale: fromTo(1, 1 + zoom), x: 0, y: 0, rotate: 0};
  }
};

export const ImageMotion: React.FC<ImageMotionProps> = (props) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const lastFrame = Math.max(1, durationInFrames - 1);
  const progress = interpolate(frame, [0, lastFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const transform = getMotionTransform({
    motion: props.motion,
    progress,
    intensity: props.intensity,
  });
  const fade = Math.min(props.fadeFrames, Math.floor(lastFrame / 2));
  const opacity =
    fade === 0
      ? 1
      : interpolate(
          frame,
          [0, fade, lastFrame - fade, lastFrame],
          [0, 1, 1, 0],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        );
  const source = props.imagePath.trim()
    ? staticFile(props.imagePath.replace(/^\//, ""))
    : null;
  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: props.fit,
    objectPosition: `${props.focusX}% ${props.focusY}%`,
    transform: `translate3d(${transform.x}%, ${transform.y}%, 0) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
    transformOrigin: `${props.focusX}% ${props.focusY}%`,
  };

  return (
    <AbsoluteFill style={{backgroundColor: props.backgroundColor, overflow: "hidden"}}>
      {source && props.backgroundBlur ? (
        <Img
          src={source}
          style={{
            ...imageStyle,
            position: "absolute",
            objectFit: "cover",
            filter: "blur(48px) saturate(0.85) brightness(0.62)",
            transform: "scale(1.16)",
            opacity: 0.9,
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          opacity: source ? opacity : 1,
          overflow: "hidden",
          borderRadius: props.cornerRadius,
        }}
      >
        {source ? (
          <Img src={source} style={imageStyle} />
        ) : (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "10%",
              color: "#F7F8FA",
              fontFamily: "Arial, 'PingFang SC', sans-serif",
              textAlign: "center",
              background:
                "radial-gradient(circle at 50% 35%, #283250 0%, #151923 45%, #0B0D12 100%)",
            }}
          >
            <div style={{fontSize: 64, fontWeight: 700, letterSpacing: -2}}>
              图片动态工作台
            </div>
            <div style={{fontSize: 30, lineHeight: 1.5, marginTop: 24, color: "#A8B0BF"}}>
              在右侧 Props 面板填写项目图片路径
              <br />
              例如 projects/acme/images/hero.jpg
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>

      {props.showSafeArea ? (
        <AbsoluteFill
          style={{
            margin: "5%",
            width: "90%",
            height: "90%",
            border: "3px dashed rgba(255,255,255,0.7)",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
