/**
 * 3D Asset Preloading Utilities
 * 
 * Provides functions to preload 3D models and textures asynchronously.
 * Includes device and network-aware preloading to optimize performance.
 * 
 * @module three-preload
 */

import { useGLTF, useTexture } from "@react-three/drei";
import { technologies } from "./constants";
import { shouldPreloadAssets, getDeviceInfo } from "./utils/performance";
import { warn } from "./utils/logger";

/**
 * Preloads the Earth 3D model asynchronously
 * Skips preloading on slow connections to prioritize initial page load
 * 
 * @example
 * ```ts
 * preloadEarth();
 * ```
 */
export function preloadEarth(): void {
  try {
    // Skip preloading on slow connections to prioritize initial page load
    if (!shouldPreloadAssets()) {
      return;
    }
    
    // Preload Earth GLTF in the background
    // This loads the model asynchronously without blocking the main thread
    useGLTF.preload("/earth/scene.gltf");
  } catch (error) {
    warn("Failed to preload Earth model", error, { context: "preloadEarth" });
  }
}

/**
 * Preloads all technology icon textures for Ball components
 * Skips preloading on slow connections or very low-end devices
 * 
 * @example
 * ```ts
 * preloadBallTextures();
 * ```
 */
export function preloadBallTextures(): void {
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
    warn("Failed to preload Ball textures", error, { context: "preloadBallTextures" });
  }
}


