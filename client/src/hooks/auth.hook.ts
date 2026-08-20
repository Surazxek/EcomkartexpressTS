// hooks/useAuth.ts

import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const isLoading = useAuthStore((state) => state.isLoading);

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const clearUser = useAuthStore((state) => state.clearUser);
  const clearToken = useAuthStore((state) => state.clearToken);

  return {
    user,
    token,

    isLoading,

    setUser,
    setToken,

    clearUser,
    clearToken,

    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
  };
};