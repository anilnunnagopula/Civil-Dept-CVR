import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.warn("⚠️ VITE_ADMIN_PASSWORD is not defined in the environment variables!");
}

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
