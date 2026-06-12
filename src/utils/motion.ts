/**
 * Framer Motion Animation Variants
 *
 * Provides reusable animation variants for consistent motion throughout the application.
 * All animations respect prefers-reduced-motion user preference.
 *
 * @module motion
 */

/**
 * Text variant animation - slides text in from top
 * @param delay - Animation delay in seconds (default: 0)
 * @returns Framer Motion variant object
 */
export const textVariant = (delay: number = 0) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

/**
 * Fade in animation variant
 * @param direction - Animation direction: "left", "right", "up", "down", or ""
 * @param type - Transition type (e.g., "tween", "spring")
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variant object
 */
export const fadeIn = (
  direction: "left" | "right" | "up" | "down" | "",
  type: string,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Zoom in animation variant
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variant object
 */
export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Slide in animation variant
 * @param direction - Animation direction: "left", "right", "up", "down", or ""
 * @param type - Transition type (e.g., "tween", "spring")
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @returns Framer Motion variant object
 */
export const slideIn = (
  direction: "left" | "right" | "up" | "down" | "",
  type: string,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Stagger container animation variant
 * Animates children with a staggered delay effect
 * @param staggerChildren - Delay between each child animation in seconds (default: 0.12)
 * @param delayChildren - Initial delay before starting animations in seconds (default: 0)
 * @returns Framer Motion variant object
 */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
