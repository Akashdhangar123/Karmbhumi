export type Role = "super_admin" | "admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  is_staff: boolean;
  is_super_admin: boolean;
  phone?: string | null;
  email_verified?: boolean;
  last_login_at?: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  redirect_to: string;
  user: User;
  permissions: string[];
}

export interface MeResponse {
  success: boolean;
  user: User;
  permissions: string[];
}