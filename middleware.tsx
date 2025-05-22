import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode'; // Importar jwt-decode

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value; // Obtener el token de la cookie

    // Definir rutas protegidas con los roles requeridos
    const protectedRoutes: { [key: string]: string } = {
        '/admin': 'admin',
        '/user/shipments': 'user',
        '/transporter': 'transporter',
    };

    const pathname = req.nextUrl.pathname;
    
    // Si intenta acceder a una ruta protegida sin token, redirigir al home
    if (Object.keys(protectedRoutes).some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        // Decodificar el token y extraer el rol del usuario
        const decoded: { role: string; exp: number } = jwtDecode(token!);
        
        // Verificar si el token ha expirado
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            // Token expirado, redirigir al home
            return NextResponse.redirect(new URL('/', req.url));
        }
        
        // Verificar si el rol tiene acceso a la ruta
        for (const [route, requiredRole] of Object.entries(protectedRoutes)) {
            if (pathname.startsWith(route) && decoded.role !== requiredRole) {
                return NextResponse.rewrite(new URL('/not-found', req.url)); // Redirigir a 404 si no tiene permisos
            }
        }
    } catch (error) {
        // Si el token es inválido, redirigir al home en lugar de login
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/transporter/:path*'],
};
