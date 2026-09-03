import { isPublicAccessPaused } from '@/utils/publicAccess';

export const publicRoutes = [
  { id: 1, path: '/about', labelKey: 'about' },
  ...(!isPublicAccessPaused
    ? [{ id: 3, path: '/login', labelKey: 'login' }]
    : []),
];

export const privateRoutes = [
  { id: 1, path: '/dashboard', labelKey: 'dashboard' },
  { id: 2, path: '/create', labelKey: 'create' },
];
