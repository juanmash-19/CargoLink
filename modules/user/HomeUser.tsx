'use client';

import { useAuth } from '@/utils/AuthContext';
import Image from 'next/image';

export default function HomeUser() {
  const { userName, userLastname } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="mb-8 w-full flex justify-center">
        <div className="w-full max-w-sm">
          <Image
            src="/images/bienvenida.png"
            alt="Bienvenida usuario"
            width={350}
            height={180}
            className="rounded-2xl shadow-xl border-4 border-blue-200 w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
      <h1 className="text-4xl font-extrabold mb-3 text-blue-900 text-center drop-shadow">
        ¡Bienvenido, {userName} {userLastname}!
      </h1>
      <h2 className="text-2xl mb-2 text-blue-700 text-center">
        Estás logueado como <span className="font-semibold text-blue-600">Usuario</span>.
      </h2>
      <p className="text-gray-700 text-center max-w-xl mt-2 text-lg">
        Desde este panel puedes <span className="font-semibold text-blue-700">explorar nuestros servicios</span>, 
        <span className="font-semibold text-blue-700"> gestionar tus envíos</span>, 
        <span className="font-semibold text-blue-700"> actualizar tu información personal</span> y revisar tu historial de actividad.
        ¡Estamos aquí para hacer tu experiencia más cómoda y segura!
      </p>
    </div>
  );
}