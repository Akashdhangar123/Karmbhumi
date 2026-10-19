import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types/auth";

interface Props {
  children: ReactNode;
  roles?: Role[]; // khali ho to bas login hona chahiye
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;

  return <>{children}</>;
}