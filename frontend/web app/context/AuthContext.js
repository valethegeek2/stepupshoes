"use client";
import { createContext, useContext, useState } from "react";
import { usersData } from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null σημαίνει ότι δεν είμαστε συνδεδεμένοι

  // Συνάρτηση Σύνδεσης
  const login = (username, password) => {
    // Ψάχνει αν υπάρχει ο χρήστης στα mock δεδομένα μας
    const foundUser = usersData.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser); // Τον αποθηκεύει στη μνήμη
      return true; // Επιτυχία!
    }
    return false; // Αποτυχία!
  };

  // Συνάρτηση Αποσύνδεσης
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