import { create } from "zustand";
import { persist } from "zustand/middleware";
import type IUser from "../types/user.types";

interface AuthState {
  user: IUser | null;
  token: string | null;

  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
   isLoading: boolean;

  clearUser: () => void;
  clearToken: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      clearUser: () => set({ user: null }),
      clearToken: () => set({ token: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
    }
  )
);