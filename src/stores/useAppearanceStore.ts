import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FontSize = 'small' | 'medium' | 'large'

/** Maps font-size key → CSS px value applied to <html> */
export const fontSizeMap: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
}

export const fontSizeLabel: Record<FontSize, string> = {
  small: '小',
  medium: '中（標準）',
  large: '大',
}

interface AppearanceState {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
}

const applyFontSize = (size: FontSize) => {
  document.documentElement.style.fontSize = fontSizeMap[size]
}

export const useAppearanceStore = create<AppearanceState>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      setFontSize: (fontSize) => {
        applyFontSize(fontSize)
        set({ fontSize })
      },
    }),
    {
      name: 'appearance-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyFontSize(state.fontSize)
        }
      },
    },
  ),
)
