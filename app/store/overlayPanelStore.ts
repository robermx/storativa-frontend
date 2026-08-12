import { create } from 'zustand';

export type OverlayPanel = 'settings' | 'edition-chapters' | null;

interface OverlayPanelState {
  activePanel: OverlayPanel;
  openPanel: (panel: Exclude<OverlayPanel, null>) => void;
  closePanel: () => void;
}

export const useOverlayPanelStore = create<OverlayPanelState>((set) => ({
  activePanel: null,
  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
}));
