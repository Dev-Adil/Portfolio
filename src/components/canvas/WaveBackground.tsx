import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WaveLineProps {
  index: number;
  totalLines: number;
}

const WaveLine = ({ index, totalLines }: WaveLineProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const pointsCount = 150;

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

  useFrame((state) => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime * 0.6;
      const colorTime = state.clock.elapsedTime * 0.15; // Slower color shift
      
      // Calculate base Y position for this line
      const baseY = (index / totalLines) * 5 - 2.5;

      for (let i = 0; i < pointsCount; i++) {
        const x = (i / pointsCount) * 40 - 20;
        
        // All lines follow the same wave pattern (unified movement)
        const wave1 = Math.sin(x * 0.4 + time) * 1.2;
        const wave2 = Math.sin(x * 0.8 - time * 0.8) * 0.6;
        const wave3 = Math.cos(x * 0.3 + time * 0.5) * 0.4;
        
        // Combine waves for the main flow
        const waveHeight = wave1 + wave2 + wave3;
        
        // Add perspective depth - lines further back have less wave amplitude
        const depthFactor = 1 - (index / totalLines) * 0.3;
        
        positions.setY(i, baseY + waveHeight * depthFactor);
      }
      
      positions.needsUpdate = true;
      
      // Animate color gradient shifting
      // Create a shifting gradient position based on time
      const gradientPosition = ((index / totalLines) + colorTime) % 1;
      
      // Interpolate between purple and blue based on shifting position
      const purple = new THREE.Color("#7c3aed"); // Vibrant purple
      const darkPurple = new THREE.Color("#4c1d95"); // Dark purple
      const blue = new THREE.Color("#3b82f6"); // Vibrant blue
      const darkBlue = new THREE.Color("#1e3a8a"); // Dark blue
      
      let color: THREE.Color;
      
      if (gradientPosition < 0.25) {
        // Dark purple to purple
        color = darkPurple.clone().lerp(purple, gradientPosition * 4);
      } else if (gradientPosition < 0.5) {
        // Purple to blue
        color = purple.clone().lerp(blue, (gradientPosition - 0.25) * 4);
      } else if (gradientPosition < 0.75) {
        // Blue to dark blue
        color = blue.clone().lerp(darkBlue, (gradientPosition - 0.5) * 4);
      } else {
        // Dark blue back to dark purple
        color = darkBlue.clone().lerp(darkPurple, (gradientPosition - 0.75) * 4);
      }
      
      (lineRef.current.material as THREE.LineBasicMaterial).color = color;
    }
  });

  return <line ref={lineRef} geometry={geometry} material={material} />;
};

const WaveLines = () => {
  const totalLines = 30;

  return (
    <>
      {Array.from({ length: totalLines }).map((_, index) => (
        <WaveLine 
          key={index} 
          index={index}
          totalLines={totalLines}
        />
      ))}
    </>
  );
};

const WaveBackground = () => {
  return (
    <Canvas
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
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <WaveLines />
    </Canvas>
  );
};

export default WaveBackground;

