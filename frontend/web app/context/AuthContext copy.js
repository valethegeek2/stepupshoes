"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('jwt');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { username: payload.sub };
  } catch {
    return null;
  }
});

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}