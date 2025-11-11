/**
 * Earth 3D Model Component
 * 
 * Renders a 3D Earth model with adaptive quality settings based on device capabilities.
 * Includes lighting, auto-rotation, and optimized rendering for performance.
 * 
 * @module canvas/Earth
 */

import { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";
import { getCanvasDPR, shouldUseAntialiasing, prefersReducedMotion, getDeviceInfo } from "../../utils/performance";

/**
 * Earth 3D Model Component
 * Loads and renders the Earth GLTF model with lighting
 */
const Earth = () => {
  const earth = useGLTF("/earth/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="black" />
      <pointLight intensity={3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
      />
      <primitive
        object={earth.scene}
        scale={2.5}
        position-y={0}
        rotation-y={0}
      />
    </mesh>
  );
};

/**
 * Earth Canvas Component
 * Wraps Earth model in a Three.js Canvas with adaptive settings
 * Optimizes rendering based on device capabilities and user preferences
 */
type EarthControlsProps = {
  autoRotate: boolean;
  reduceMotion: boolean;
};

const EarthControls = ({ autoRotate, reduceMotion }: EarthControlsProps) => {
  const { gl, camera } = useThree();
  const domElement = gl?.domElement;

  if (!domElement) {
    return null;
  }

  return (
    <OrbitControls
      args={[camera, domElement]}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotate ? 1 : 0}
      enableZoom={false}
      enablePan={false}
      enableRotate={!reduceMotion}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      makeDefault
    />
  );
};

const EarthCanvas = () => {
  const dpr = useMemo(() => getCanvasDPR(), []);
  const antialias = useMemo(() => shouldUseAntialiasing(), []);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const shouldAutoRotate = useMemo(
    () => !reduceMotion && !(deviceInfo.isLowEnd || deviceInfo.isMobile),
    [deviceInfo.isLowEnd, deviceInfo.isMobile, reduceMotion]
  );
  
  const frameloopMode = shouldAutoRotate ? "always" : "demand";

  return (
    <Canvas
      shadows={false}
      frameloop={frameloopMode}
      dpr={dpr}
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={({ gl }) => {
        // Enable in-session caching for loaders
        try { THREE.Cache.enabled = true; } catch {}
      }}
      style={{ width: '100%', height: '100%' }}
      gl={{ 
        antialias, 
        powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance", 
        alpha: true, 
        preserveDrawingBuffer: false 
      }}
    >
      <Suspense fallback={<Loader />}>
        <EarthControls autoRotate={shouldAutoRotate} reduceMotion={reduceMotion} />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
