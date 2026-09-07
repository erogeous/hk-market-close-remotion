import {AbsoluteFill, Composition, Img, registerRoot, staticFile, useCurrentFrame} from 'remotion';
import config from '../projects/xiaoman-100-days/project.config';

const profile = config.exportProfiles.landscape;
const duration = 240;
const Loop = () => {
  const frame = useCurrentFrame();
  const phase = 2 * Math.PI * frame / duration;
  const breathe = (1 - Math.cos(phase)) / 2;
  return <AbsoluteFill style={{background: config.brand.colors.background, overflow: 'hidden'}}>
    <Img src={staticFile('projects/xiaoman-100-days/images/keepsake.png')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + 0.022 * breathe})`, transformOrigin: '60% 53%'}} />
    {Array.from({length: 22}, (_, i) => {
      const p = phase + i * 2.399;
      const x = (i * 137.5 + 42) % profile.width;
      const y = (i * 211 + 32) % profile.height;
      // Keep the central face and title free of added particles.
      if (x > 220 && x < 1310 && y > 130 && y < 860) return null;
      const size = 3 + (i % 4) * 1.5;
      return <div key={i} style={{position: 'absolute', left: x + Math.sin(p) * 12, top: y + Math.cos(p) * 18, width: size, height: size, borderRadius: '50%', background: config.brand.colors.text, boxShadow: `0 0 ${size * 3}px ${config.brand.colors.accent}`, opacity: 0.15 + 0.45 * (1 + Math.sin(p)) / 2}} />;
    })}
  </AbsoluteFill>;
};
const Root = () => <Composition id="XiaomanLoop" component={Loop} durationInFrames={duration} fps={profile.fps} width={profile.width} height={profile.height} />;
registerRoot(Root);
