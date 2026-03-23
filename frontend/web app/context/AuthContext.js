"use client";
import { createContext, useContext, useState } from "react";
import { usersData } from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 

  // Handle user login
  const login = (username, password) => {
    // Check credentials against mock data
    const foundUser = usersData.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Handle user logout
  const logout = () => {
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