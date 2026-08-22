import enAbout from './locales/en/about.json';
import enHome from './locales/en/home.json';
import esAbout from './locales/es/about.json';
import esHome from './locales/es/home.json';

export const i18nResources = {
  es: {
    about: esAbout,
    home: esHome,
  },
  en: {
    about: enAbout,
    home: enHome,
  },
} as const;
