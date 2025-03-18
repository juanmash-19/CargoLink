import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useAuth } from './AuthContext';
import { notFound } from 'next/navigation';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    
    const {userRole} = useAuth();// Obtener el token de autenticación

    // Definir rutas protegidas
    const protectedRoutes = ['/admin', '/user', '/transporter'];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        // Si intenta acceder sin token, redirigir al login
        return NextResponse.redirect(new URL('/login', req.url));
    }

//------------------------------------- Admin ----------------------------------

    if (protectedRoutes[0] === req.nextUrl.pathname && !(userRole === 'admin')){
        return notFound();
    }

//------------------------------------- User ----------------------------------


    if (protectedRoutes[1] === req.nextUrl.pathname && !(userRole === 'user')){
        return notFound();
    }

//------------------------------------- Transporter ----------------------------------


    if (protectedRoutes[2] === req.nextUrl.pathname && !(userRole === 'transporter')){
        return notFound();
    }
    
    return NextResponse.next();
}



// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/transporter/:path*'],
};