// AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRoleUser } from '@/libs/ServiceUser/api-services';
import Cookies from 'js-cookie';

interface AuthContextType {
  userRole: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUserRole: () => Promise<void>; // Nueva función
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchUserRole = async () => {
    const token = Cookies.get('token');
    console.log('Token en fetchUserRole:', token); // Imprime el token
    if (token) {
      try {
        const user = await getRoleUser();
        console.log('Rol obtenido:', user.role); // Imprime el rol obtenido
        setUserRole(user.role ?? null);
      } catch (error) {
        console.error('Error al obtener el rol:', error);
        setUserRole(null);
      }
    } else {
      console.log('No hay token, userRole se establece en null'); // Imprime si no hay token
      setUserRole(null);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { maxAge: "3600", secure: true });
    fetchUserRole(); // Actualiza el rol después de iniciar sesión
  };

  const logout = () => {
    Cookies.remove('token');
    setUserRole(null);
  };

  // Nueva función para forzar la recarga del rol
  const refreshUserRole = async () => {
    await fetchUserRole();
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, refreshUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};