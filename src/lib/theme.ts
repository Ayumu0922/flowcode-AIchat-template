/**
 * Theme — single source of truth for component styling tokens.
 *
 * Color VALUES live in index.css (CSS variables).
 * This file maps those variables to semantic Tailwind classes
 * so components never hardcode `dark:` variants or raw colors.
 *
 * Usage:
 *   import { theme } from '@/lib/theme'
 *   <div className={theme.bubble.user}>...</div>
 */

export const theme = {
  /** Chat bubbles */
  bubble: {
    user: 'bg-bubble-user text-bubble-user-fg',
    ai: 'bg-bubble-ai text-bubble-ai-fg',
  },

  /** Icon circles (avatar-like accents) */
  icon: {
    accent: 'bg-icon-accent text-icon-accent-fg',
    muted: 'bg-foreground/10 text-foreground',
  },

  /** Bar chart */
  bar: {
    fill: 'bg-bar',
    hover: 'hover:bg-bar-hover',
  },

  /** Interactive surface states (nav items, list rows) */
  surface: {
    hover: 'hover:bg-surface-hover',
    active: 'bg-surface-active',
  },

  /** Typography helpers (beyond Tailwind defaults) */
  text: {
    sub: 'text-text-sub',
    body: 'text-[15px]',
    heading: 'text-2xl font-semibold text-foreground',
    sectionLabel: 'text-sm font-medium text-text-sub',
  },
} as const
