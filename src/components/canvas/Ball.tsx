import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import { getCanvasDPR, shouldUseAntialiasing, prefersReducedMotion, getDeviceInfo } from "../../utils/performance";

type BallProps = { imgUrl: string };
const Ball = ({ imgUrl }: BallProps) => {
  const [decal] = useTexture([imgUrl]);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  
  // Reduce animation intensity on low-end devices or when motion is reduced
  const floatSpeed = reduceMotion ? 0 : (deviceInfo.isLowEnd ? 1 : 1.75);
  const rotationIntensity = reduceMotion ? 0 : (deviceInfo.isLowEnd ? 0.5 : 1);
  const floatIntensity = reduceMotion ? 0 : (deviceInfo.isLowEnd ? 1 : 2);
  const useShadows = !deviceInfo.isLowEnd;

  return (
    <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow={useShadows} receiveShadow={useShadows} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

type BallCanvasProps = { icon: string };
const BallCanvas = ({ icon }: BallCanvasProps) => {
  const dpr = useMemo(() => getCanvasDPR(), []);
  const antialias = useMemo(() => shouldUseAntialiasing(), []);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  
  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      gl={{ 
        antialias, 
        powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance", 
        alpha: true, 
        preserveDrawingBuffer: false 
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
