'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Charger l'utilisateur depuis localStorage au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('larq_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation de connexion - en production, cela ferait un appel API
    const storedUsers = localStorage.getItem('larq_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('larq_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulation d'inscription - en production, cela ferait un appel API
    const storedUsers = localStorage.getItem('larq_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Vérifier si l'email existe déjà
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    // Ajouter le nouvel utilisateur
    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem('larq_users', JSON.stringify(users));
    
    // Connecter automatiquement l'utilisateur
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('larq_user', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('larq_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

