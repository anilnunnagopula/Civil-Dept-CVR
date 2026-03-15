import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_PASSWORD = 'civil@admin2024'; // ← change this to your desired password

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('ce_admin') === 'true'
  );

  function login(password) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('ce_admin', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem('ce_admin');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
