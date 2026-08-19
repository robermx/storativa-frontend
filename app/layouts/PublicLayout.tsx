import { Outlet } from 'react-router';

import { requireAnonymous } from '@/lib/authRouteGuards';

export const clientLoader = async () => {
  await requireAnonymous();

  return null;
};

clientLoader.hydrate = true as const;

export const HydrateFallback = () => (
  <div
    aria-label="Comprobando sesión"
    aria-live="polite"
    className="min-h-dvh bg-light dark:bg-dark"
  />
);

const PublicLayout = () => <Outlet />;

export default PublicLayout;
