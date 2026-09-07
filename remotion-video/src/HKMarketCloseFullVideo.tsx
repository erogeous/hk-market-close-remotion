import {AbsoluteFill,interpolate,Sequence,useCurrentFrame} from "remotion";
import {HKGlobalMarketsPrototype} from "./HKGlobalMarketsPrototype";
import {HKMarketSnapshotPrototype} from "./HKMarketSnapshotPrototype";
import {HKMarketBreadthPrototype} from "./HKMarketBreadthPrototype";
import {HKSectorPerformancePrototype} from "./HKSectorPerformancePrototype";
import {HKStocksFocusPrototype} from "./HKStocksFocusPrototype";
import {HKSouthboundPrototype} from "./HKSouthboundPrototype";
import {HKMarketWrapUpPrototype} from "./HKMarketWrapUpPrototype";

export const HK_FULL_VIDEO = {
  fps: 30,
  transitionFrames: 15,
  scenes: [
    {id:"global", duration:240, Component:HKGlobalMarketsPrototype},
    {id:"snapshot", duration:300, Component:HKMarketSnapshotPrototype},
    {id:"breadth", duration:300, Component:HKMarketBreadthPrototype},
    {id:"sector", duration:300, Component:HKSectorPerformancePrototype},
    {id:"stocks", duration:300, Component:HKStocksFocusPrototype},
    {id:"southbound", duration:300, Component:HKSouthboundPrototype},
    {id:"wrap-up", duration:300, Component:HKMarketWrapUpPrototype},
  ],
} as const;

export const HK_FULL_VIDEO_DURATION = HK_FULL_VIDEO.scenes.reduce((sum,scene)=>sum+scene.duration,0)-HK_FULL_VIDEO.transitionFrames*(HK_FULL_VIDEO.scenes.length-1);

const FadedScene:React.FC<React.PropsWithChildren<{duration:number;first:boolean;last:boolean}>>=({duration,first,last,children})=>{
  const frame=useCurrentFrame();
  const t=HK_FULL_VIDEO.transitionFrames;
  const fadeIn=first?1:interpolate(frame,[0,t],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const fadeOut=last?1:interpolate(frame,[duration-t,duration],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <AbsoluteFill style={{opacity:Math.min(fadeIn,fadeOut)}}>{children}</AbsoluteFill>;
};

export const HKMarketCloseFullVideo:React.FC=()=>{
  let start=0;
  return <AbsoluteFill style={{backgroundColor:"#020A18"}}>{HK_FULL_VIDEO.scenes.map((scene,index)=>{
    const from=start;
    start+=scene.duration-HK_FULL_VIDEO.transitionFrames;
    const Scene=scene.Component;
    return <Sequence key={scene.id} from={from} durationInFrames={scene.duration} name={scene.id} premountFor={30}><FadedScene duration={scene.duration} first={index===0} last={index===HK_FULL_VIDEO.scenes.length-1}><Scene/></FadedScene></Sequence>;
  })}</AbsoluteFill>;
};
