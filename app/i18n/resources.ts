import enAbout from './locales/en/about.json';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enCreate from './locales/en/create.json';
import enDashboard from './locales/en/dashboard.json';
import enHome from './locales/en/home.json';
import enNavigation from './locales/en/navigation.json';
import esAbout from './locales/es/about.json';
import esAuth from './locales/es/auth.json';
import esCommon from './locales/es/common.json';
import esCreate from './locales/es/create.json';
import esDashboard from './locales/es/dashboard.json';
import esHome from './locales/es/home.json';
import esNavigation from './locales/es/navigation.json';

export const i18nResources = {
  es: {
    about: esAbout,
    auth: esAuth,
    common: esCommon,
    create: esCreate,
    dashboard: esDashboard,
    home: esHome,
    navigation: esNavigation,
  },
  en: {
    about: enAbout,
    auth: enAuth,
    common: enCommon,
    create: enCreate,
    dashboard: enDashboard,
    home: enHome,
    navigation: enNavigation,
  },
} as const;
