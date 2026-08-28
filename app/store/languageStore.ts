import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LanguageDefinition {
  code: string;
  label: string;
  nativeLabel: string;
}

/**
 * Add a new definition here to make it available to the whole application.
 * The store logic intentionally does not assume there are only two languages.
 */
export const LANGUAGES = [
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
] as const satisfies readonly LanguageDefinition[];

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'es';

export const isLanguageCode = (value: unknown): value is LanguageCode =>
  typeof value === 'string' &&
  LANGUAGES.some((language) => language.code === value);

export const getLanguageDefinition = (languageCode: LanguageCode) =>
  LANGUAGES.find((language) => language.code === languageCode)!;

interface LanguageState {
  language: LanguageCode;
  lockedLanguage: LanguageCode | null;
  setLanguage: (language: LanguageCode) => void;
  cycleLanguage: () => void;
  lockLanguage: (language: LanguageCode) => void;
  unlockLanguage: () => void;
}

type PersistedLanguageState = Pick<LanguageState, 'language'>;

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: DEFAULT_LANGUAGE,
      lockedLanguage: null,
      setLanguage: (language) => {
        if (isLanguageCode(language) && !get().lockedLanguage) set({ language });
      },
      cycleLanguage: () => {
        if (get().lockedLanguage) return;
        const currentIndex = LANGUAGES.findIndex(
          (language) => language.code === get().language,
        );
        const nextIndex = (currentIndex + 1) % LANGUAGES.length;

        set({ language: LANGUAGES[nextIndex].code });
      },
      lockLanguage: (language) => {
        if (isLanguageCode(language)) set({ lockedLanguage: language });
      },
      unlockLanguage: () => set({ lockedLanguage: null }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ language }) => ({ language }),
      merge: (persistedState, currentState) => {
        const persistedLanguage = (persistedState as PersistedLanguageState)
          ?.language;

        return {
          ...currentState,
          language: isLanguageCode(persistedLanguage)
            ? persistedLanguage
            : DEFAULT_LANGUAGE,
          lockedLanguage: null,
        };
      },
    },
  ),
);
