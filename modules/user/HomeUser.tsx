'use client';

import { useAuth } from '@/utils/AuthContext';

export default function HomeUser() {
  const { userName, userLastname } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido, {userName} {userLastname}!</h1>
      <h2 className="text-xl mb-2">
        Estás logueado como <span className="font-semibold text-blue-600">Usuario</span>.
      </h2>
      <p className="text-gray-700 text-center max-w-xl">
        Desde este panel puedes explorar nuestros servicios, gestionar tus compras o pedidos,
        actualizar tu información personal, y revisar tu historial de actividad. Estamos aquí para hacer tu experiencia más cómoda y segura.
      </p>
    </div>
  );
}
