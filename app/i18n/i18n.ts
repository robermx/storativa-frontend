import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
} from '@/store/languageStore';
import { i18nResources } from './resources';

void i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES.map(({ code }) => code),
  ns: ['about', 'auth', 'common', 'create', 'dashboard', 'home', 'navigation'],
  defaultNS: 'home',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
