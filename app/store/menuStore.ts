import { create } from 'zustand';

interface MenuState {
  menuExpanded: boolean;
  closeMenuExpand: () => void;
  toggleMenuExpand: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuExpanded: false,
  closeMenuExpand: () => set({ menuExpanded: false }),
  toggleMenuExpand: () =>
    set((state) => ({ menuExpanded: !state.menuExpanded })),
}));
