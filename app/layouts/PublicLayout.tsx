import { Outlet, useLocation } from 'react-router';

import { requireAnonymous } from '@/lib/authRouteGuards';
import PublicAccessPaused from '@/components/public/PublicAccessPaused';
import { isPublicAccessPaused } from '@/utils/publicAccess';

export const clientLoader = async () => {
  if (isPublicAccessPaused) return null;

  await requireAnonymous();

  return null;
};

clientLoader.hydrate = !isPublicAccessPaused as boolean;

export const HydrateFallback = () => (
  <div
    aria-label="Comprobando sesión"
    aria-live="polite"
    className="min-h-dvh bg-light dark:bg-dark"
  />
);

const PublicLayout = () => {
  const { pathname } = useLocation();
  const isBlockedAuthRoute = pathname === '/login' || pathname === '/register';

  if (isPublicAccessPaused && isBlockedAuthRoute) {
    return <PublicAccessPaused />;
  }

  return <Outlet />;
};

export default PublicLayout;
