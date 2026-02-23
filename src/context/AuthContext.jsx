import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";

const AUTH_STORAGE_KEY = "portfolio_admin_auth";

const AuthContext = createContext(null);

function loadStoredAuth() {
  try {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.expiresAt && parsed.expiresAt > Date.now()) {
        return { isAuthenticated: true };
      }
    }
  } catch {
    // ignore
  }
  return { isAuthenticated: false };
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(loadStoredAuth);

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.expiresAt && parsed.expiresAt <= Date.now()) {
          sessionStorage.removeItem(AUTH_STORAGE_KEY);
          setAuthState({ isAuthenticated: false });
        }
      } catch {
        setAuthState({ isAuthenticated: false });
      }
    }
  }, []);

  const login = useCallback((username, password) => {
    const envUser = import.meta.env.VITE_ADMIN_USERNAME;
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!envUser || !envPass) {
      return { success: false, error: "Admin credentials not configured" };
    }

    if (username === envUser && password === envPass) {
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      sessionStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ expiresAt })
      );
      setAuthState({ isAuthenticated: true });
      return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({ isAuthenticated: false });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      login,
      logout,
    }),
    [authState.isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
