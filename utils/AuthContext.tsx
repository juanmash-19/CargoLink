'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Añadir esta librería
import Cookies from 'js-cookie';
import { createTokenCookie } from './CreateCookieServer';
import { refreshToken } from "@/libs/auth/api-login";

interface AuthContextType {
  userRole: string | null;
  login: (token: string) => void;
  logout: () => void;
  // Eliminar refreshUserRole (no es necesario)
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [tokenExpirationTimeout, setTokenExpirationTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const scheduleTokenRenewal = (token: string) => {
    const decoded: { exp?: number } = jwtDecode(token);
    if (decoded.exp) {
      const expirationTime = decoded.exp * 1000;
      const timeUntilRenewal = expirationTime - Date.now() - 5 * 60 * 1000; // 5 minutos antes

      if (timeUntilRenewal > 0) {
        const timeout = setTimeout(async () => {
          try {
            const { token: newToken } = await refreshToken();
            login(newToken);
          } catch (error) {
            console.error('Error renovando token:', error);
            logout();
          }
        }, timeUntilRenewal);

        setTokenExpirationTimeout(timeout);
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const role = getRoleFromToken(token);
      setUserRole(role);
      scheduleTokenRenewal(token);
    } else {
      setUserRole(null);
    }

    return () => {
      if (tokenExpirationTimeout) clearTimeout(tokenExpirationTimeout);
    };
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { 
      maxAge: '3600', 
      secure: true, 
      sameSite: 'Strict' // Mejorar seguridad
    });
    createTokenCookie(token);
    const role = getRoleFromToken(token);
    setUserRole(role);
    scheduleTokenRenewal(token);
  };

  const logout = () => {
    Cookies.remove('token');
    setUserRole(null);
    if (tokenExpirationTimeout) clearTimeout(tokenExpirationTimeout);
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