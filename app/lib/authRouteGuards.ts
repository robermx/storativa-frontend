import { redirect, replace } from 'react-router';

import { ensureAuthSession } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';

export const AUTHENTICATED_HOME_PATH = '/dashboard';
export const LOGIN_PATH = '/login';

export const requireAuthenticated = async () => {
  const hasSession = await ensureAuthSession();
  const token = useAuthStore.getState().token;

  if (!hasSession || !token) {
    throw redirect(LOGIN_PATH);
  }
};

export const requireAnonymous = async () => {
  const hasSession = await ensureAuthSession();

  if (hasSession) {
    throw replace(AUTHENTICATED_HOME_PATH);
  }
};
