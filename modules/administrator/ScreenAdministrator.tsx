'use client';

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-blue-600 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>
      <ul>
        <li className="mb-4">
          <Link href="/repartidores" className="hover:text-orange-400">
            Repartidores
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/clientes" className="hover:text-orange-400">
            Clientes
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/coordinadores" className="hover:text-orange-400">
            Coordinadores
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 p-6">
        <button
          className="mb-4 p-2 bg-blue-600 text-white rounded"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Ocultar Barra Lateral' : 'Mostrar Barra Lateral'}
        </button>
        {children}
      </div>
    </div>
  );
};

export default function AdminPage() {
  const cardsData = [
    {
      title: 'Estadísticas',
      description: 'Visualiza las estadísticas ',
      imageUrl: '/img/estadisticas.jpg',
    },
    {
      title: 'Reportes',
      description: 'Genera y consulta reportes detallados.',
      imageUrl: '/img/reportes.jpg',
    },
    {
      title: 'Ventas',
      description: 'Gestiona y analiza las ventas realizadas.',
      imageUrl: '/img/ventas.jpg',
    },
    {
      title: 'Rutas',
      description: 'Planifica y supervisa las rutas de entrega.',
      imageUrl: '/img/rutas.jpg',
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-900">Bienvenido al Panel de Administración</h1>
      <p className="mt-4 text-gray-700">
        Selecciona una opción del menú para gestionar los diferentes módulos.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardsData.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
