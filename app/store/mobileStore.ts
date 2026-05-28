import { create } from 'zustand';

interface SettingsState {
  mobileExpand: boolean;
  openMoblileExpand: () => void;
  closeMobileExpand: () => void;
  toggleMobileExpand: () => void;
}

export const useMoblieExpand = create<SettingsState>((set) => ({
  mobileExpand: false,
  openMoblileExpand: () => set({ mobileExpand: true }),
  closeMobileExpand: () => set({ mobileExpand: false }),
  toggleMobileExpand: () =>
    set((state) => ({ mobileExpand: !state.mobileExpand })),
}));
