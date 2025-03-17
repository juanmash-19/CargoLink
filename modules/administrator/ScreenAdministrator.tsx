'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '@/components/atoms/Sidebar';
import SimpleCard from '@/components/atoms/SimpleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const Sidebar = () => {
//   return (
//     <div className="bg-blue-900 text-white w-64 min-h-screen p-4">
//       <h2 className="text-2xl font-bold mb-6">Panel de Administrador</h2>
//       <ul>
//         <li className="mb-4">
//           <Link href="/repartidor" className="hover:text-orange-400">Repartidores</Link>
//         </li>
//         <li className="mb-4">
//           <Link href="/clientes" className="hover:text-orange-400">Clientes</Link>
//         </li>
//         <li className="mb-4">
//           <Link href="/coordinadores" className="hover:text-orange-400">Coordinadores</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

const sidebarItems = [
  { name: "Administrador", href: "/admin" },
  { name: "Trasnportador", href: "/repartidor" },
  { name: "Perfil", href: "/user" }
];

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

export default function AdminPage() {
  const [selectedCard, setSelectedCard] = useState(null);

  const chartDataVentas = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas',
        data: [1200, 1900, 3000, 5000, 7000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartDataUsuarios = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Usuarios',
        data: [150, 180, 220, 300, 450],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const chartDataProblemas = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Problemas Reportados',
        data: [10, 15, 8, 12, 18],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  const cardsData = [
    { title: 'Ventas Totales', value: '$3,249', variant: 'primary', icon: '🛒' },
    { title: 'Usuarios Totales', value: '249', variant: 'secondary', icon: '👥' },
    { title: 'Tiempo del Servidor', value: '152 días', variant: 'ghost', icon: '🖥' },
    { title: 'Tareas Pendientes', value: '7 tareas', variant: 'danger', icon: '📋' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-900">Administrador</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <SimpleCard
            key={index}
            title={card.title}
            value={card.value}
            variant={'primary'}
            icon={card.icon}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>
      {selectedCard && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">{selectedCard.title}</h2>
          <p className="text-lg">{selectedCard.value}</p>
        </div>
      )}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Gráfico de Ventas</h2>
        <Bar data={chartDataVentas} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Gráfico de Usuarios</h2>
        <Bar data={chartDataUsuarios} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Gráfico de Problemas</h2>
        <Bar data={chartDataProblemas} />
      </div>
    </AdminLayout>
  );
}
