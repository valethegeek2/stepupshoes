"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const checkIsAdmin = async (token) => {
  try {
    const config = new Configuration({ basePath: 'http://localhost:8080' });
    const adminApi = new AdminControllerApi(config);
    const requestOpts = await adminApi.getAllRolesRequestOpts({});
    requestOpts.headers['Authorization'] = `Bearer ${token}`;
    const rawResponse = await adminApi.request(requestOpts);
    return rawResponse.status === 200;
  } catch {
    return false;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('jwt');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      return { username: payload.sub, role: isAdmin ? 'admin' : 'user' };
    } catch {
      return null;
    }
  });

  const login = async (username, token) => {
    const isAdmin = await checkIsAdmin(token);
    localStorage.setItem('isAdmin', isAdmin);
    setUser({ username, role: isAdmin ? 'admin' : 'user' });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isAdmin');
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