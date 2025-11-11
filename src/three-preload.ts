import { useGLTF, useTexture } from "@react-three/drei";
import { technologies } from "./constants";
import { shouldPreloadAssets, getDeviceInfo } from "./utils/performance";

export function preloadEarth() {
  try {
    // Skip preloading on slow connections to prioritize initial page load
    if (!shouldPreloadAssets()) {
      return;
    }
    
    // Preload Earth GLTF in the background
    // This loads the model asynchronously without blocking the main thread
    useGLTF.preload("/earth/scene.gltf");
  } catch (error) {
    console.warn("Failed to preload Earth model:", error);
  }
}

export function preloadBallTextures() {
  try {
    // Skip preloading on slow connections
    if (!shouldPreloadAssets()) {
      return;
    }
    
    const deviceInfo = getDeviceInfo();
    
    // Skip preloading on very low-end devices (they might use static images)
    if (deviceInfo.isLowEnd && deviceInfo.isMobile) {
      return;
    }
    
    // Preload all technology icon textures for the Ball components
    // This loads the textures asynchronously without blocking the main thread
    technologies.forEach((tech) => {
      useTexture.preload(tech.icon);
    });
  } catch (error) {
    console.warn("Failed to preload Ball textures:", error);
  }
}


