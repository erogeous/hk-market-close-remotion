import "./index.css";
import type { CalculateMetadataFunction } from "remotion";
import { Composition, Folder } from "remotion";
import {
  ImageMotion,
  imageMotionSchema,
  type ImageMotionProps,
} from "./ImageMotion";
import { MarketMicroscope } from "./MarketMicroscope";
import { MarketOverviewAnimated } from "./MarketOverviewAnimated";
import { DailyCloseAnimated } from "./DailyCloseAnimated";
import { DailyCloseP5Faithful } from "./DailyCloseP5Faithful";
import { HKGlobalMarketsPrototype } from "./HKGlobalMarketsPrototype";
import { HKMarketSnapshotPrototype } from "./HKMarketSnapshotPrototype";
import { HKMarketBreadthPrototype } from "./HKMarketBreadthPrototype";
import { HKSectorPerformancePrototype } from "./HKSectorPerformancePrototype";
import { HKStocksFocusPrototype } from "./HKStocksFocusPrototype";
import { HKSouthboundPrototype } from "./HKSouthboundPrototype";
import { HKMarketWrapUpPrototype } from "./HKMarketWrapUpPrototype";
import {HKMarketCloseFullVideo,HK_FULL_VIDEO_DURATION} from "./HKMarketCloseFullVideo";
import {
  DailyCloseP2Faithful,
  DailyCloseP3Faithful,
  DailyCloseP4Faithful,
  DailyCloseP6Faithful,
} from "./DailyCloseFaithfulPages";

const dimensions = {
  landscape: { width: 1920, height: 1080 },
  vertical: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;

const calculateMetadata: CalculateMetadataFunction<ImageMotionProps> = ({
  props,
}) => {
  const size = dimensions[props.aspectRatio];

  return {
    ...size,
    durationInFrames: Math.round(props.durationSeconds * 30),
    fps: 30,
    props,
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ImageMotionClip"
        component={ImageMotion}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        schema={imageMotionSchema}
        defaultProps={{
          imagePath: "",
          motion: "zoom-in",
          durationSeconds: 5,
          aspectRatio: "vertical",
          fit: "cover",
          focusX: 50,
          focusY: 50,
          intensity: 0.45,
          fadeFrames: 8,
          backgroundColor: "#0B0D12",
          backgroundBlur: true,
          cornerRadius: 0,
          showSafeArea: false,
        }}
        calculateMetadata={calculateMetadata}
      />
      <Folder name="Market-Microscope-20260707">
        <Composition
          id="MarketMicroscope02V2"
          component={MarketOverviewAnimated}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope01"
          component={MarketMicroscope}
          defaultProps={{ shot: 1 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope02"
          component={MarketMicroscope}
          defaultProps={{ shot: 2 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope03"
          component={MarketMicroscope}
          defaultProps={{ shot: 3 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope04"
          component={MarketMicroscope}
          defaultProps={{ shot: 4 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope05"
          component={MarketMicroscope}
          defaultProps={{ shot: 5 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope06"
          component={MarketMicroscope}
          defaultProps={{ shot: 6 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope07"
          component={MarketMicroscope}
          defaultProps={{ shot: 7 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope08"
          component={MarketMicroscope}
          defaultProps={{ shot: 8 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MarketMicroscope09"
          component={MarketMicroscope}
          defaultProps={{ shot: 9 }}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Daily-Close-20260821">
        <Composition
          id="DailyClose20260821"
          component={DailyCloseAnimated}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DailyCloseP2"
          component={DailyCloseP2Faithful}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DailyCloseP3"
          component={DailyCloseP3Faithful}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DailyCloseP4"
          component={DailyCloseP4Faithful}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DailyCloseP5"
          component={DailyCloseP5Faithful}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DailyCloseP6"
          component={DailyCloseP6Faithful}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="HK-Market-Close">
        <Composition id="HKMarketCloseFullVideo" component={HKMarketCloseFullVideo} durationInFrames={HK_FULL_VIDEO_DURATION} fps={30} width={1080} height={1920}/>
        <Composition id="HKMarketCloseWrapUpPrototype" component={HKMarketWrapUpPrototype} durationInFrames={300} fps={30} width={1080} height={1920}/>
        <Composition id="HKMarketCloseSouthboundPrototype" component={HKSouthboundPrototype} durationInFrames={300} fps={30} width={1080} height={1920}/>
        <Composition
          id="HKMarketCloseStocksFocusPrototype"
          component={HKStocksFocusPrototype}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HKMarketCloseSectorPrototype"
          component={HKSectorPerformancePrototype}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HKMarketCloseBreadthPrototype"
          component={HKMarketBreadthPrototype}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HKMarketCloseSnapshotPrototype"
          component={HKMarketSnapshotPrototype}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HKMarketCloseGlobalPrototype"
          component={HKGlobalMarketsPrototype}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
