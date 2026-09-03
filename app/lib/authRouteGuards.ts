import { redirect, replace } from 'react-router';

import { ensureAuthSession } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { isPublicAccessPaused } from '@/utils/publicAccess';

export const AUTHENTICATED_HOME_PATH = '/dashboard';
export const LOGIN_PATH = '/login';

export const requireAuthenticated = async () => {
  if (isPublicAccessPaused) {
    throw redirect('/');
  }

  const hasSession = await ensureAuthSession();
  const token = useAuthStore.getState().token;

  if (!hasSession || !token) {
    throw redirect(LOGIN_PATH);
  }
};

export const requireAnonymous = async () => {
  if (isPublicAccessPaused) return;

  const hasSession = await ensureAuthSession();

  if (hasSession) {
    throw replace(AUTHENTICATED_HOME_PATH);
  }
};
