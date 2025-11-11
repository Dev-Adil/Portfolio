import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";
import { getCanvasDPR, shouldUseAntialiasing, prefersReducedMotion, getDeviceInfo } from "../../utils/performance";

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

const EarthCanvas = () => {
  const dpr = useMemo(() => getCanvasDPR(), []);
  const antialias = useMemo(() => shouldUseAntialiasing(), []);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const shouldAutoRotate = useMemo(() => !deviceInfo.isLowEnd && !prefersReducedMotion(), [deviceInfo.isLowEnd]);
  
  return (
    <Canvas
      shadows={false}
      frameloop="demand"
      dpr={dpr}
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={() => {
        // Enable in-session caching for loaders
        try { THREE.Cache.enabled = true; } catch {}
      }}
      gl={{ 
        antialias, 
        powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance", 
        alpha: true, 
        preserveDrawingBuffer: false 
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          autoRotate={shouldAutoRotate}
          autoRotateSpeed={shouldAutoRotate ? 1 : 0}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
