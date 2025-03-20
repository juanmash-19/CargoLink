'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SimpleCard from '@/components/atoms/SimpleCard';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Definir el tipo de tarjeta con variantes restringidas
type VariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

interface CardType {
  title: string;
  value: string;
  variant: VariantType;
  icon: string;
}

export default function AdminPage() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const chartData = {
    ventas: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Ventas', data: [1200, 1900, 3000, 5000, 7000], backgroundColor: 'rgba(54, 162, 235, 0.5)' }],
    },
    usuarios: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Usuarios', data: [150, 180, 220, 300, 450], backgroundColor: 'rgba(255, 99, 132, 0.5)' }],
    },
    problemas: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Problemas Reportados', data: [10, 15, 8, 12, 18], backgroundColor: 'rgba(255, 206, 86, 0.5)' }],
    },
  };

  const cardsData: CardType[] = [
    { title: 'Ventas Totales', value: '$3,249', variant: 'primary', icon: '🛒' },
    { title: 'Usuarios Totales', value: '249', variant: 'secondary', icon: '👥' },
    { title: 'Tiempo del Servidor', value: '152 días', variant: 'ghost', icon: '🖥' },
    { title: 'Tareas Pendientes', value: '7 tareas', variant: 'danger', icon: '📋' },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Administrador</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <SimpleCard key={index} {...card} onClick={() => setSelectedCard(card)} />
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
        <Bar data={chartData.ventas} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Gráfico de Usuarios</h2>
        <Bar data={chartData.usuarios} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Gráfico de Problemas</h2>
        <Bar data={chartData.problemas} />
      </div>
    </div>
  );
}
