import { useSyncExternalStore } from 'react';
import { useAuthStore } from '@/store/authStore';

const useHydrated = (): boolean => {
  return useSyncExternalStore(
    (callback) => useAuthStore.persist.onFinishHydration(callback),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
};

export default useHydrated;
