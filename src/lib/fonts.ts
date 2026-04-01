/**
 * Font configuration — single source of truth.
 *
 * Uses the system font stack for fast rendering and native feel.
 * Keep in sync with --font-heading / --font-sans in index.css.
 *
 * To switch to a custom font (e.g. Google Fonts):
 *   1. Update `family` here
 *   2. Update --font-heading / --font-sans in index.css
 *   3. Add the <link> tag in index.html
 */

const systemStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

export const fonts = {
  heading: { family: systemStack },
  body: { family: systemStack },
  mono: {
    family:
      "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
  /** Base size — mobile 15px, md+ 16px (set via html in index.css) */
  baseSize: { mobile: '15px', desktop: '16px' },
} as const
