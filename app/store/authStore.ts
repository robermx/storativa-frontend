import { create } from 'zustand';

import { User } from '@/interfaces/auth.interface';

const AUTH_BOOTSTRAP_KEY = 'authenticated';

export type AuthStatus = 'unknown' | 'authenticated' | 'anonymous';

const canUseStorage = () => typeof window !== 'undefined';

const hasAuthBootstrapIntent = () =>
  canUseStorage() && localStorage.getItem(AUTH_BOOTSTRAP_KEY) === 'true';

const setAuthBootstrapIntent = (value: boolean) => {
  if (!canUseStorage()) return;

  if (value) {
    localStorage.setItem(AUTH_BOOTSTRAP_KEY, 'true');
    return;
  }

  localStorage.removeItem(AUTH_BOOTSTRAP_KEY);
};

interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  shouldBootstrap: () => boolean;
  setAuth: (user: User, token: string) => void;
  setAnonymous: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  status: hasAuthBootstrapIntent() ? 'unknown' : 'anonymous',
  shouldBootstrap: () => {
    const { status, token } = get();

    return !token && status === 'unknown' && hasAuthBootstrapIntent();
  },
  setAuth: (user, token) => {
    setAuthBootstrapIntent(true);
    set({ user, token, status: 'authenticated' });
  },
  setAnonymous: () => {
    setAuthBootstrapIntent(false);
    set({ user: null, token: null, status: 'anonymous' });
  },
  logout: () => {
    setAuthBootstrapIntent(false);
    set({ user: null, token: null, status: 'anonymous' });
  },
}));
