import { useRef, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getDeviceInfo, prefersReducedMotion, getCanvasDPR, shouldUseAntialiasing } from "../../utils/performance";

interface WaveLineProps {
  index: number;
  totalLines: number;
  pointsCount: number;
  reduceMotion: boolean;
}

const WaveLine = memo(({ index, totalLines, pointsCount, reduceMotion }: WaveLineProps) => {
  const lineRef = useRef<THREE.Line>(null);

  // Reusable color objects (created once, reused per frame)
  const colors = useMemo(() => ({
    purple: new THREE.Color("#7c3aed"),
    darkPurple: new THREE.Color("#4c1d95"),
    blue: new THREE.Color("#3b82f6"),
    darkBlue: new THREE.Color("#1e3a8a"),
    temp: new THREE.Color(), // Reusable temporary color
  }), []);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < pointsCount; i++) {
      const x = (i / pointsCount) * 40 - 20;
      points.push(new THREE.Vector3(x, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      linewidth: 3,
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  // Pre-calculate constants
  const baseY = useMemo(() => (index / totalLines) * 5 - 2.5, [index, totalLines]);
  const depthFactor = useMemo(() => 1 - (index / totalLines) * 0.3, [index, totalLines]);

  useFrame((state) => {
    if (lineRef.current && !reduceMotion) {
      const positions = lineRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime * 0.6;
      const colorTime = state.clock.elapsedTime * 0.15;

      for (let i = 0; i < pointsCount; i++) {
        const x = (i / pointsCount) * 40 - 20;
        
        const wave1 = Math.sin(x * 0.4 + time) * 1.2;
        const wave2 = Math.sin(x * 0.8 - time * 0.8) * 0.6;
        const wave3 = Math.cos(x * 0.3 + time * 0.5) * 0.4;
        
        const waveHeight = wave1 + wave2 + wave3;
        positions.setY(i, baseY + waveHeight * depthFactor);
      }
      
      positions.needsUpdate = true;
      
      // Animate color gradient - reuse color objects
      const gradientPosition = ((index / totalLines) + colorTime) % 1;
      
      if (gradientPosition < 0.25) {
        colors.temp.copy(colors.darkPurple).lerp(colors.purple, gradientPosition * 4);
      } else if (gradientPosition < 0.5) {
        colors.temp.copy(colors.purple).lerp(colors.blue, (gradientPosition - 0.25) * 4);
      } else if (gradientPosition < 0.75) {
        colors.temp.copy(colors.blue).lerp(colors.darkBlue, (gradientPosition - 0.5) * 4);
      } else {
        colors.temp.copy(colors.darkBlue).lerp(colors.darkPurple, (gradientPosition - 0.75) * 4);
      }
      
      (lineRef.current.material as THREE.LineBasicMaterial).color.copy(colors.temp);
    }
  });

  return <line ref={lineRef} geometry={geometry} material={material} />;
});

WaveLine.displayName = 'WaveLine';

interface WaveLinesProps {
  totalLines: number;
  pointsCount: number;
  reduceMotion: boolean;
}

const WaveLines = ({ totalLines, pointsCount, reduceMotion }: WaveLinesProps) => {
  return (
    <>
      {Array.from({ length: totalLines }).map((_, index) => (
        <WaveLine 
          key={index} 
          index={index}
          totalLines={totalLines}
          pointsCount={pointsCount}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
};

const WaveBackground = () => {
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const dpr = useMemo(() => getCanvasDPR(), []);
  const antialias = useMemo(() => shouldUseAntialiasing(), []);
  
  // Reduce complexity on mobile/low-end devices
  const totalLines = useMemo(() => {
    if (deviceInfo.isLowEnd) return 15;
    if (deviceInfo.isMobile) return 20;
    return 30;
  }, [deviceInfo.isLowEnd, deviceInfo.isMobile]);
  
  const pointsCount = useMemo(() => {
    if (deviceInfo.isLowEnd) return 80;
    if (deviceInfo.isMobile) return 100;
    return 150;
  }, [deviceInfo.isLowEnd, deviceInfo.isMobile]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      gl={{ 
        antialias,
        alpha: true,
        powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance"
      }}
    >
      <WaveLines 
        totalLines={totalLines} 
        pointsCount={pointsCount}
        reduceMotion={reduceMotion}
      />
    </Canvas>
  );
};

export default WaveBackground;

