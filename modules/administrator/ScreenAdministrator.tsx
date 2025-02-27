'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Botón de flecha para manejar la barra lateral */}
      <div className="absolute top-5 left-3 z-50">
        <button
          className="p-2 bg-white text-orange-600 border border-orange-400 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
      </div>

      {/* Barra lateral */}
      {isSidebarOpen && <Sidebar />}

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  );
};

export default function AdminPage() {
  const cardsData = [
    {
      title: 'Estadísticas',
      description: 'Visualiza las estadísticas',
      imageUrl: '/images/estadisticas.png',
    },
    {
      title: 'Reportes',
      description: 'Genera y consulta reportes detallados.',
      imageUrl: '/images/reportes.png',
    },
    {
      title: 'Ventas',
      description: 'Gestiona y analiza las ventas realizadas.',
      imageUrl: '/images/ventas.jpg',
    },
    {
      title: 'Rutas',
      description: 'Planifica y supervisa las rutas de entrega.',
      imageUrl: '/images/rutas.jpg',
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
          <Card key={card.title} title={card.title} description={card.description} imageUrl={card.imageUrl} />
        ))}
      </div>
    </AdminLayout>
  );
}
