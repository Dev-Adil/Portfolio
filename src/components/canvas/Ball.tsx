/**
 * Ball 3D Component
 * 
 * Renders a 3D icosahedron with a technology icon decal.
 * Includes floating animation with adaptive intensity based on device capabilities.
 * 
 * @module canvas/Ball
 */

import React, { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";
import { getCanvasDPR, shouldUseAntialiasing, prefersReducedMotion, getDeviceInfo } from "../../utils/performance";

/**
 * Ball 3D Model Component
 * @param imgUrl - URL of the technology icon texture to display on the ball
 * @param canvasRef - Ref to the canvas container for position tracking
 */
type BallProps = { imgUrl: string };
const Ball = ({ imgUrl }: BallProps) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef<THREE.Mesh>(null);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  
  // Reduce animation intensity on low-end devices or when motion is reduced
  const floatSpeed = reduceMotion ? 0 : (deviceInfo.isLowEnd ? 1 : 1.75);
  const rotationIntensity = 0;
  const floatIntensity = reduceMotion ? 0 : (deviceInfo.isLowEnd ? 1 : 2);
  const useShadows = !deviceInfo.isLowEnd;

  // Scroll-based rotation - smooth 3D effect as user scrolls
  // Each ball adjusts rotation based on scroll velocity for interactivity
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollDeltaRef = useRef(0);
  
  // Track scroll and viewport position, invalidate frame when needed
  useEffect(() => {
    if (reduceMotion) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDeltaRef.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduceMotion]);

  useFrame((_, delta) => {
    if (!meshRef.current || reduceMotion) return;

    try {
      const scrollDelta = scrollDeltaRef.current;

      // Base rotation speed (slower on low-end devices)
      const baseSpeed = deviceInfo.isLowEnd ? 0.3 : 0.6;

      // Continuous base rotation
      meshRef.current.rotation.y += baseSpeed * delta;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = 0;

      // Apply scroll-induced rotation bursts
      const scrollInfluence = THREE.MathUtils.clamp(scrollDelta / 600, -0.6, 0.6);
      if (Math.abs(scrollInfluence) > 0.0001) {
        meshRef.current.rotation.y += scrollInfluence;
      }

      // Gradually diminish stored scroll delta
      scrollDeltaRef.current = 0;
    } catch (error) {
      // Silently handle errors (element might not be mounted yet)
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        ref={meshRef}
        castShadow={useShadows} 
        receiveShadow={useShadows} 
        scale={2.75}
      >
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

/**
 * Ball Canvas Component
 * Wraps Ball model in a Three.js Canvas with adaptive settings
 * @param icon - URL of the technology icon texture
 */
type BallCanvasProps = { icon: string };
const BallCanvas = ({ icon }: BallCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dpr = useMemo(() => getCanvasDPR(), []);
  const antialias = useMemo(() => shouldUseAntialiasing(), []);
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  
  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop="always"
        dpr={dpr}
        gl={{ 
          antialias, 
          powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance", 
          alpha: true, 
          preserveDrawingBuffer: false 
        }}
        onCreated={({ gl }) => {
          // Ensure canvas is ready before OrbitControls connects
          if (gl.domElement) {
            gl.domElement.setAttribute('data-ready', 'true');
          }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
