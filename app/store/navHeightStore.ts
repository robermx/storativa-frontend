import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface NavHeightState {
  navHeight: number;
  addMenuHeight: number;
  setNavHeight: (value: number) => void;
  setAddMenuHeight: (value: number) => void;
}

export const useNavHeight = create<NavHeightState>()(
  persist(
    (set) => ({
      navHeight: 0,
      addMenuHeight: 0,
      setNavHeight: (value: number) => set({ navHeight: value }),
      setAddMenuHeight: (value: number) => set({ addMenuHeight: value }),
    }),
    {
      name: 'nav-height-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
