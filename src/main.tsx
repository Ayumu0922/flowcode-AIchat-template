import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Hydrate persisted stores so saved settings apply before first paint
import '@/stores/useAppearanceStore'
import '@/stores/useThemeStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
