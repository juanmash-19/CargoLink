'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SimpleCard from '@/components/atoms/SimpleCard';
import { getDriverStats } from '../../libs/ServiceTransporter/api-transporter'; 
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

// Registrar componentes de Chart.js
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
  const t = useTranslations();  const [totals, setTotals] = useState({
    disponibles: 0,
    activos: 0,
    disponiblesStats: [0, 0, 0, 0, 0],
    activosStats: [0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {        const response = await getDriverStats();
        setTotals({
          disponibles: response.disponibles,
          activos: response.activos,
          disponiblesStats: response.disponiblesStats || [0, 0, 0, 0, 0],
          activosStats: response.activosStats || [0, 0, 0, 0, 0],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener estadísticas de transportador:', error);
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const disponiblesChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: t('transporter.dashboard.availableShipmentsChart'),
      data: totals.disponiblesStats,
      backgroundColor: 'rgba(34,197,94,0.5)',
    }],
  };

  const activosChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: t('transporter.dashboard.activeShipmentsChart'),
      data: totals.activosStats,
      backgroundColor: 'rgba(59,130,246,0.5)',
    }],
  };

  const cardsData: CardType[] = [
    {
      title: t('transporter.dashboard.availableShipments'),
      value: totals.disponibles.toString(),
      variant: 'primary',
      icon: '🟢',
      onClick: () => router.push('/transporter/shipments/available'),
    },
    {
      title: t('transporter.dashboard.activeShipments'),
      value: totals.activos.toString(),
      variant: 'secondary',
      icon: '🚚',
      onClick: () => router.push('/transporter/shipments/actives'),
    },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6 mt-3">
      <h1 className="text-3xl font-bold text-gray-900">{t('transporter.dashboard.title')}</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <SimpleCard key={index} {...card} onClick={card.onClick} />
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-600 text-lg font-medium">Cargando estadísticas...</span>
          </div>
        ) : (          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4 text-center">{t('transporter.dashboard.availableShipmentsChart')}</h2>
              <div className="w-full h-[250px]">
                <Bar
                  data={disponiblesChartData}
                  options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4 text-center">{t('transporter.dashboard.activeShipmentsChart')}</h2>
              <div className="w-full h-[250px]">
                <Bar
                  data={activosChartData}
                  options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}