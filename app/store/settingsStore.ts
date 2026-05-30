import { create } from 'zustand';

interface SettingsState {
  areSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  areSettingsOpen: false,
  openSettings: () => set({ areSettingsOpen: true }),
  closeSettings: () => set({ areSettingsOpen: false }),
  toggleSettings: () =>
    set((state) => ({ areSettingsOpen: !state.areSettingsOpen })),
}));
