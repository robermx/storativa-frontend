import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { User } from "@/interfaces/auth.interface";

interface AuthState {
  fullName: string | null;
  token: string | null;
  refreshToken: string | null; // <-- Nuevo campo
  setAuth: (fullName: string, token: string, refreshToken: string) => void; // <-- Actualizado
  setTokens: (token: string, refreshToken: string) => void; // <-- Nueva acción
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      fullName: null,
      token: null,
      refreshToken: null,
      setAuth: (fullName, token, refreshToken) => 
        set({ fullName, token, refreshToken }),
      setTokens: (token, refreshToken) => 
        set({ token, refreshToken }),
      logout: () => 
        set({ fullName: null, token: null, refreshToken: null }),
    }),
    {
      name: "auth_storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);