// Detect device capabilities for performance optimization
export const getDeviceCapabilities = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  const isLowEndDevice = () => {
    // Check for low-end indicators
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    return (
      isMobile ||
      (memory && memory < 4) || // Less than 4GB RAM
      (cores && cores < 4) // Less than 4 CPU cores
    );
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return {
    isMobile,
    isLowEndDevice: isLowEndDevice(),
    prefersReducedMotion,
    supportsWebP: document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0,
  };
};

export const getOptimalSettings = () => {
  const capabilities = getDeviceCapabilities();
  
  return {
    // Star field settings
    starCount: capabilities.isLowEndDevice ? 500 : 1500,
    enableStars: !capabilities.prefersReducedMotion,
    
    // Wave background settings
    waveLineCount: capabilities.isLowEndDevice ? 15 : 30,
    enableWaves: !capabilities.prefersReducedMotion,
    
    // 3D settings
    enable3D: !capabilities.isLowEndDevice,
    pixelRatio: capabilities.isMobile ? [1, 1.5] : [1, 2],
    antialias: !capabilities.isLowEndDevice,
  };
};

