'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Añadir esta librería
import Cookies from 'js-cookie';

interface AuthContextType {
  userRole: string | null;
  login: (token: string) => void;
  logout: () => void;
  // Eliminar refreshUserRole (no es necesario)
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Función para decodificar el token y obtener el rol
  const getRoleFromToken = (token: string): string | null => {
    try {
      const decoded: { role?: string; exp?: number } = jwtDecode(token);
      
      // Verificar expiración
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        logout();
        return null;
      }
      
      return decoded.role || null;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const role = getRoleFromToken(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { 
      maxAge: '3600', 
      secure: true, 
      sameSite: 'Strict' // Mejorar seguridad
    });
    const role = getRoleFromToken(token);
    setUserRole(role);
  };

  const logout = () => {
    Cookies.remove('token');
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
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