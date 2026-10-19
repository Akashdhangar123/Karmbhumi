import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { apiFetch, setToken, clearToken, getToken } from "../api/client";
import type { User, LoginResponse, MeResponse } from "../types/auth";

interface AuthContextType {
  user: User | null;
  permissions: string[];
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// Ye codes/status aaye tab hi token sach mein invalid maana jayega
const AUTH_FAIL_CODES = ["TOKEN_EXPIRED", "TOKEN_REVOKED", "INVALID_TOKEN", "NO_TOKEN"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Page refresh par token se user wapas load karo
  useEffect(() => {
    async function restore() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiFetch<MeResponse>("/auth/me");
        setUser(data.user);
        setPermissions(data.permissions ?? []);
      } catch (err: any) {
        const code: string | undefined = err?.code;
        const status: number | undefined = err?.status;
        const authFailed =
          status === 401 || status === 403 || (code !== undefined && AUTH_FAIL_CODES.includes(code));

        // Sirf auth failure par token hatao; network/server error par nahi
        if (authFailed) {
          clearToken();
          setUser(null);
          setPermissions([]);
        }
      } finally {
        setLoading(false);
      }
    }
    restore();
  }, []);

  // Session expire/revoke hone par: state clear + home pe bhejo
  useEffect(() => {
    function handleExpired() {
      clearToken();
      setUser(null);
      setPermissions([]);
      if (window.location.pathname !== "/") {
        window.location.replace("/");
      }
    }
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  async function login(email: string, password: string): Promise<LoginResponse> {
    const data = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    setPermissions(data.permissions ?? []);
    return data;
  }

  async function logout(): Promise<void> {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // logout API fail ho tab bhi local session clear karo
    }
    clearToken();
    setUser(null);
    setPermissions([]);
  }

  return (
    <AuthContext.Provider value={{ user, permissions, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}