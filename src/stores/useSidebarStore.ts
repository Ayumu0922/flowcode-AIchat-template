import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  open: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      open: true,
      toggle: () => set((s) => ({ open: !s.open })),
      setOpen: (open) => set({ open }),
    }),
    { name: 'sidebar-storage' },
  ),
)
