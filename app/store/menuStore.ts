import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MenuState {
  menuExpanded: boolean;
  closeMenuExpand: () => void;
  toggleMenuExpand: () => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menuExpanded: false,
      closeMenuExpand: () => set({ menuExpanded: false }),
      toggleMenuExpand: () =>
        set((state) => ({ menuExpanded: !state.menuExpanded })),
    }),
    {
      name: 'menu-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
