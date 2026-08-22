import enAbout from './locales/en/about.json';
import enAuth from './locales/en/auth.json';
import enHome from './locales/en/home.json';
import enNavigation from './locales/en/navigation.json';
import esAbout from './locales/es/about.json';
import esAuth from './locales/es/auth.json';
import esHome from './locales/es/home.json';
import esNavigation from './locales/es/navigation.json';

export const i18nResources = {
  es: {
    about: esAbout,
    auth: esAuth,
    home: esHome,
    navigation: esNavigation,
  },
  en: {
    about: enAbout,
    auth: enAuth,
    home: enHome,
    navigation: enNavigation,
  },
} as const;
