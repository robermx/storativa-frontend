import { create } from 'zustand';

interface NavHeightState {
  navHeight: number;
  addMenuHeight: number;
  setNavHeight: (value: number) => void;
  setAddMenuHeight: (value: number) => void;
}

export const useNavHeight = create<NavHeightState>((set) => ({
  navHeight: 0,
  addMenuHeight: 0,
  setNavHeight: (value: number) => set({ navHeight: value }),
  setAddMenuHeight: (value: number) => set({ addMenuHeight: value }),
}));
