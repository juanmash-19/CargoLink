'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push('/login'); // Redirige al usuario si no tiene permisos
    }
  }, [userRole, allowedRoles, router]);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null; // No renderiza nada mientras se verifica el rol
  }

  return <>{children}</>;
};

export default ProtectedRoute;