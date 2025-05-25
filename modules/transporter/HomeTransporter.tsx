'use client';

import { useAuth } from '@/utils/AuthContext';

export default function HomeTransportador() {
  const { userName, userLastname } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido, {userName} {userLastname}!</h1>
      <h2 className="text-xl mb-2">Estás logueado como <span className="font-semibold text-green-600">Transportador</span>.</h2>
      <p className="text-gray-700 text-center max-w-xl">
        Desde este panel puedes consultar los fletes disponibles, hacer seguimiento a tus envíos activos, revisar el historial de entregas completadas y acceder a toda la información relevante para tus operaciones logísticas.
      </p>
    </div>
  );
}
