'use client';

import { useAuth } from '@/utils/AuthContext';
import Image from 'next/image';

export default function HomeAdmin() {
  const { userName, userLastname } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="mb-8">
        <Image
          src="/images/admin.png"
          alt="Administrador"
          width={280}
          height={280}
          className="rounded-2xl shadow-2xl"
          priority
        />
      </div>
      <h1 className="text-4xl font-extrabold mb-3 text-blue-900 text-center">
        ¡Bienvenido, {userName} {userLastname}!
      </h1>
      <h2 className="text-2xl mb-2 text-blue-700 text-center">
        Estás logueado como <span className="font-semibold text-blue-600">Administrador</span>.
      </h2>
      <p className="text-gray-700 text-center max-w-xl mt-2 text-lg">
        Desde este panel puedes <span className="font-semibold text-blue-700">gestionar usuarios</span>, 
        <span className="font-semibold text-blue-700"> administrar envíos</span>, 
        <span className="font-semibold text-blue-700"> revisar y gestionar reportes</span>, 
        y acceder a todas las funcionalidades administrativas del sistema.
      </p>
    </div>
  );
}