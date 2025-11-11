import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random";
import { getCanvasDPR, prefersReducedMotion, getDeviceInfo } from "../../utils/performance";

type StarsProps = { starCount: number; reduceMotion: boolean };
const Stars = ({ starCount, reduceMotion }: StarsProps) => {
  const ref = useRef<any>();

  const sphere = useMemo(() => 
    inSphere(new Float32Array(starCount), { radius: 1.2 }) as Float32Array,
    [starCount]
  );

  useFrame((state, delta) => {
    if (!reduceMotion && ref.current) {
      ref.current.rotation.x += delta / 10;
      ref.current.rotation.y += delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const deviceInfo = useMemo(() => getDeviceInfo(), []);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const dpr = useMemo(() => getCanvasDPR(), []);
  
  // Reduce star count on mobile/low-end devices
  const starCount = useMemo(() => {
    if (deviceInfo.isLowEnd) return 800;
    if (deviceInfo.isMobile) return 1000;
    return 1500;
  }, [deviceInfo.isLowEnd, deviceInfo.isMobile]);

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas 
        dpr={dpr} 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance",
          antialias: false,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <Stars starCount={starCount} reduceMotion={reduceMotion} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
