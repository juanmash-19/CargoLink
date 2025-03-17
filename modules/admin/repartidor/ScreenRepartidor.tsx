'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '@/components/atoms/Sidebar';

const sidebarItems = [
  { name: "Pedidos Entregados", href: "/pedidos-entregados" },
  { name: "Pedidos Disponibles", href: "/pedidos-disponibles" },
  { name: "Estado Actual", href: "/estado-actual" }
];

const PedidoCard = ({ pedido, tipo }: any) => {
  return (
    <div className="max-w-2xl bg-white rounded-lg shadow-md p-4 mb-4 flex w-full">
      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg mr-4">
        <img src={pedido.imagen} alt={pedido.titulo} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-blue-700">{pedido.titulo}</h3>
        <p className="text-gray-700 text-sm">Distancia: {pedido.distancia} | Costo: {pedido.costo}</p>
        <p className="text-gray-700 text-sm">Recorrido total: {pedido.recorrido} | Ganancia: {pedido.ganancia}</p>
        <p className="text-gray-700 text-sm">Dimensiones: {pedido.dimensiones}</p>
        {tipo === 'disponible' && (
          <p className="text-red-600 font-bold text-sm">Tiempo restante: {pedido.tiempoRestante}</p>
        )}
        <div className="flex mt-2 space-x-2">
          <Link href="/mapa" className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
            Abrir en mapa
          </Link>
          <Link href="/detalles" className="bg-orange-400 text-white px-3 py-1 rounded-md text-sm">
            Ver detalles
          </Link>
          {tipo === 'disponible' && (
            <Link href="/aceptar-pedido" className="bg-blue-900 text-white px-3 py-1 rounded-md text-sm">
              Aceptar flete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminLayout = ({ children } : {children : React.ReactNode}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <div className="absolute top-5 left-3 z-50">
        <button
          className="p-2 bg-white text-orange-600 border border-orange-400 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
      </div>
      {isSidebarOpen && <Sidebar items={sidebarItems} variant="ghost" />}
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  );
};

export default function RepartidoresPage() {
  const pedidosEntregados = [
    {
      titulo: 'Electrodomésticos',
      distancia: '5Km',
      recorrido: '12Km',
      costo: '25000',
      ganancia: '25000',
      dimensiones: '50cm | 40cm | 30cm | 20kg',
      imagen: '/images/electrodomesticos.jpg',
    },
  ];

  const pedidosDisponibles = [
    {
      titulo: 'Bolsas de mercado',
      distancia: '2.3Km',
      recorrido: '8.6Km',
      costo: '15000',
      ganancia: '15000',
      dimensiones: '20cm | 30cm | 50cm | 10kg',
      imagen: '/images/bolsamercado.jpg',
      tiempoRestante: '2:23 s',
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-900">Panel de Repartidores</h1>
      <p className="mt-4 text-gray-700">Aquí puedes gestionar los pedidos entregados y los disponibles.</p>

      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold text-gray-900 mt-6">Pedidos Entregados</h2>
        {pedidosEntregados.map((pedido, index) => (
          <PedidoCard key={index} pedido={pedido} tipo="entregado" />
        ))}

        <h2 className="text-2xl font-bold text-gray-900 mt-6">Pedidos Disponibles</h2>
        {pedidosDisponibles.map((pedido, index) => (
          <PedidoCard key={index} pedido={pedido} tipo="disponible" />
        ))}
      </div>
    </AdminLayout>
  );
}

