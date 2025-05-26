'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Añadir esta librería
import Cookies from 'js-cookie';
import { createTokenCookie } from './CreateCookieServer';
import { refreshToken } from "@/libs/auth/api-login";
import { useRouter } from 'next/navigation'; // Importar router para redirección

interface AuthContextType {
  userRole: string | null;
  userEmail: string | null; // Cambiado a userEmail
  userName: string | null; // Cambiado a userName
  userLastname: string | null; // Cambiado a userLastname
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Cambiado a userEmail
  const [userName, setUserName] = useState<string | null>(null); // Cambiado a userName
  const [userLastname, setUserLastname] = useState<string | null>(null); // Cambiado a userLastname
  const [tokenExpirationTimeout, setTokenExpirationTimeout] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // Función para decodificar el token y obtener el rol
  const getInfoFromToken = (token: string): { role: string | null; userEmail: string | null; userName: string | null; userLastname: string | null } => {
    try {
      const decoded: { role?: string; email?: string; name?: string; lastname?: string; exp?: number } = jwtDecode(token);
      console.log('Decoded token:', decoded); // Para depuración
      // Verificar expiración
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        logout();
        return { role: null, userEmail: null, userName: null, userLastname: null };
      }

      return {
        role: decoded.role || null,
        userEmail: decoded.email || null,
        userName: decoded.name || null,
        userLastname: decoded.lastname || null,
      };
    } catch (error) {
      console.error('Error decodificando token:', error);
      return { role: null, userEmail: null, userName: null, userLastname: null };
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
      const { role, userEmail, userName, userLastname } = getInfoFromToken(token);
      setUserRole(role);
      setUserEmail(userEmail);
      setUserName(userName);
      setUserLastname(userLastname);
      scheduleTokenRenewal(token);
    } else {
      setUserRole(null);
      setUserEmail(null);
      setUserName(null);
      setUserLastname(null);
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
    const { role, userEmail, userName, userLastname } = getInfoFromToken(token);
    setUserRole(role);
    setUserEmail(userEmail);
    setUserName(userName);
    setUserLastname(userLastname);
    scheduleTokenRenewal(token);
    if(role === 'admin'){
      router.push('/');
    }else if(role === 'transporter'){
      router.push('/');
    }
    else if(role === 'user'){
      router.push('/');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUserRole(null);
    setUserEmail(null);
    setUserName(null);
    setUserLastname(null);
    if (tokenExpirationTimeout) clearTimeout(tokenExpirationTimeout);
  };

  return (
    <AuthContext.Provider value={{ userRole, userEmail, userName, userLastname, login, logout }}>
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