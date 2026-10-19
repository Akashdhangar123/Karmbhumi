// ---------------- API URL ----------------
const LOCAL_API_URL = "https://karmbhumi-backend.vercel.app/api";
const PRODUCTION_API_URL = "https://karmbhumi-backend.vercel.app/api"; // deploy ke baad apna backend URL yahan daalo

// Vite dev (npm run dev) me local, build/deploy me production URL use hoga
export const API_URL: string = import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL;

// ---------------- TOKEN ----------------
export const getToken = (): string | null => localStorage.getItem("token");
export const setToken = (t: string): void => localStorage.setItem("token", t);
export const clearToken = (): void => localStorage.removeItem("token");

// ---------------- ERROR ----------------
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

// Ye error codes aaye to token bekaar hai, session clear karna hai
const AUTH_FAIL_CODES = ["TOKEN_EXPIRED", "TOKEN_REVOKED", "INVALID_TOKEN", "NO_TOKEN", "AUTH_ERROR"];

// ---------------- FETCH HELPER ----------------
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch {
    // Server band hai ya network issue
    throw new ApiError("Cannot reach server. Please try again.", 0);
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // response me JSON nahi tha
  }

  if (!res.ok) {
    // Token expire/revoke hua to local token hata do (login API ke 401 ko ignore karte hain)
    if (res.status === 401 && data?.code && AUTH_FAIL_CODES.includes(data.code)) {
      clearToken();
    }
    throw new ApiError(data?.message || "Something went wrong", res.status, data?.code);
  }

  return data as T;
}