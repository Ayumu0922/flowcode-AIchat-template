/**
 * Motion configuration — single source of truth for all animations.
 *
 * Minimal and purposeful. Only used where animation adds
 * genuine clarity (chat messages, loading indicators, charts).
 */
import type { Transition, Variants } from 'framer-motion'

/* Transition presets */
export const fast: Transition = { duration: 0.12, ease: 'easeOut' }
export const normal: Transition = { duration: 0.18, ease: 'easeOut' }

/* Chat bubbles — subtle fade in */
export const chatBubble: Variants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: fast },
}

/* Typing dots */
export const typingDot = (index: number) => ({
  animate: {
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: index * 0.2,
      ease: 'easeInOut' as const,
    },
  },
})

/* Bar chart grow */
export const barGrow = (delay: number): Variants => ({
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.3, ease: 'easeOut', delay },
  },
})
