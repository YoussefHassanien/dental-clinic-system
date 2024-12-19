import React, { useState, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = (token: string, userId: string, role: string) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  const value: AuthContextType = { token, userId, role, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
