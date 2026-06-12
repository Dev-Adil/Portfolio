/**
 * Performance Utilities
 *
 * Minimal browser-API helpers. (3D/device-capability helpers were removed
 * along with the Three.js layer.)
 *
 * @module utils/performance
 */

/**
 * Check if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
