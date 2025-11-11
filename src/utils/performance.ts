/**
 * Lightweight performance utilities using built-in browser APIs
 * No external dependencies - pure browser detection
 */

// Cache device info to avoid repeated checks
let deviceInfo: {
  isMobile: boolean;
  isLowEnd: boolean;
  hasSlowConnection: boolean;
  pixelRatio: number;
} | null = null;

/**
 * Detect mobile device using user agent and screen size
 */
function detectMobile(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isSmallScreen = window.innerWidth <= 768;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return mobileRegex.test(ua) || (hasTouch && isSmallScreen);
}

/**
 * Detect low-end device based on hardware concurrency and device memory
 */
function detectLowEnd(): boolean {
  // Check CPU cores
  const cores = navigator.hardwareConcurrency || 2;
  if (cores <= 2) return true;
  
  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  return false;
}

/**
 * Detect slow network connection
 */
function detectSlowConnection(): boolean {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (connection) {
    // Check effective connection type
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return true;
    
    // Check save-data mode
    if (connection.saveData) return true;
    
    // Check downlink speed (Mbps)
    if (connection.downlink && connection.downlink < 1.5) return true;
  }
  
  return false;
}

/**
 * Get optimal pixel ratio for device
 */
function getOptimalPixelRatio(): number {
  const dpr = window.devicePixelRatio || 1;
  const isMobile = detectMobile();
  const isLowEnd = detectLowEnd();
  
  // Cap DPR on mobile/low-end devices
  if (isMobile || isLowEnd) {
    return Math.min(dpr, 1.5);
  }
  
  return Math.min(dpr, 2);
}

/**
 * Get device performance info (cached)
 */
export function getDeviceInfo() {
  if (deviceInfo) return deviceInfo;
  
  deviceInfo = {
    isMobile: detectMobile(),
    isLowEnd: detectLowEnd(),
    hasSlowConnection: detectSlowConnection(),
    pixelRatio: getOptimalPixelRatio(),
  };
  
  return deviceInfo;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimized canvas DPR
 */
export function getCanvasDPR(): [number, number] {
  const info = getDeviceInfo();
  const maxDPR = info.pixelRatio;
  return [1, maxDPR];
}

/**
 * Should use antialiasing
 */
export function shouldUseAntialiasing(): boolean {
  const info = getDeviceInfo();
  return !info.isMobile && !info.isLowEnd;
}

/**
 * Should preload assets (skip on slow connections)
 */
export function shouldPreloadAssets(): boolean {
  const info = getDeviceInfo();
  return !info.hasSlowConnection;
}
