
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to manually decode JWT (since we don't have jwt-decode library installed in this env)
const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { exp } = JSON.parse(jsonPayload);
    
    // Check if expired (exp is in seconds, Date.now() is ms)
    if (exp && Date.now() >= exp * 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return true; // Assume expired if invalid
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state directly from localStorage to avoid initial render redirect issues
  const [token, setToken] = useState<string | null>(() => {
      const storedToken = localStorage.getItem('token');
      return storedToken;
  });
  
  const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
  });

  // Validate token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        // Token expired while app was closed or during refresh validation
        console.warn("Session expired. Clearing storage.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
      // If valid, state is already set by lazy initialization
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Note: Router components listening to isAuthenticated will automatically redirect
  }, []);

  // Listen for 401/403 events from api.ts
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
