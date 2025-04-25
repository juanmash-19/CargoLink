'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SimpleCard from '@/components/atoms/SimpleCard';
import { useRouter } from 'next/navigation';
//Servicio getDriverStats() si tiene uno en libs/ServiceTransportador

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type VariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

interface CardType {
  title: string;
  value: string;
  variant: VariantType;
  icon: string;
  onClick?: () => void;
}

export default function TransportadorDashboard() {
  const [totals, setTotals] = useState({
    disponibles: 0,
    activos: 0,
    todos: 0,
  });

  const router = useRouter();

  useEffect(() => {
    // Simulando respuesta del backend
    const fetchStats = async () => {
      try {
        // Aquí iría una llamada real al backend
        setTotals({
          disponibles: 12,
          activos: 5,
          todos: 20,
        });
      } catch (error) {
        console.error('Error al obtener estadísticas de transportador:', error);
      }
    };

    fetchStats();
  }, []);

  const cardsData: CardType[] = [
    {
      title: 'Fletes Disponibles',
      value: totals.disponibles.toString(),
      variant: 'primary',
      icon: '🟢',
      onClick: () => router.push('/transportador/fletes/disponibles'),
    },
    {
      title: 'Fletes Activos',
      value: totals.activos.toString(),
      variant: 'secondary',
      icon: '🚚',
      onClick: () => router.push('/transportador/fletes/activos'),
    },
    {
      title: 'Todos los Fletes',
      value: totals.todos.toString(),
      variant: 'ghost',
      icon: '📦',
      onClick: () => router.push('/transportador/fletes'),
    },
  ];

  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Fletes Completados',
      data: [2, 4, 6, 3, 5],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }],
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 mt-3">
      <h1 className="text-3xl font-bold text-gray-900">Transportador</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <SimpleCard key={index} {...card} />
        ))}
      </div>

      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Historial de Fletes Completados</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
