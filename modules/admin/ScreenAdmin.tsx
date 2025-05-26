'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SimpleCard from '@/components/atoms/SimpleCard';
import { getGeneralStats } from '@/libs/ServiceAdmin/api-admin';
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

export default function AdminPage() {
  const t = useTranslations();  
  const [totals, setTotals] = useState({
    totalUsers: 0,
    totalShipments: 0,
    totalReports: 0,
    usersStats: [] as number[],
    shipmentsStats: [] as number[],
    reportsStats: [] as number[],
    labels: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getGeneralStats();
        setTotals({
          totalUsers: response.totals.users,
          totalShipments: response.totals.shipments,
          totalReports: response.totals.reports,
          usersStats: response.monthly.users || [0, 0, 0, 0, 0, 0],
          shipmentsStats: response.monthly.shipments || [0, 0, 0, 0, 0, 0],
          reportsStats: response.monthly.reports || [0, 0, 0, 0, 0, 0],
          labels: response.monthly.labels || ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);
  const usersChartData = {
    labels: totals.labels,
    datasets: [{
      label: t('admin.dashboard.usersChart'),
      data: totals.usersStats,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }],
  };

  const shipmentsChartData = {
    labels: totals.labels,
    datasets: [{
      label: t('admin.dashboard.shipmentsChart'),
      data: totals.shipmentsStats,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };

  const reportsChartData = {
    labels: totals.labels,
    datasets: [{
      label: t('admin.dashboard.reportsChart'),
      data: totals.reportsStats,
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    }],
  };

  const cardsData: CardType[] = [
    {
      title: t('admin.dashboard.totalShipments'),
      value: totals.totalShipments.toString(),
      variant: 'primary',
      icon: '📦',
      onClick: () => router.push('/admin/shipments')
    },
    {
      title: t('admin.dashboard.totalUsers'),
      value: totals.totalUsers.toString(),
      variant: 'secondary',
      icon: '👥',
      onClick: () => router.push('/admin/users')
    },
    {
      title: t('admin.dashboard.pendingReports'),
      value: totals.totalReports.toString(),
      variant: 'danger',
      icon: '📋',
      onClick: () => router.push('/admin/reports')
    },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6 mt-3">
      <h1 className="text-3xl font-bold text-gray-900">{t('admin.dashboard.title')}</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <SimpleCard key={index} {...card} onClick={card.onClick} />
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-600 text-lg font-medium">Cargando estadísticas...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4 text-center text-black">{t('admin.dashboard.usersChart')}</h2>
              <div className="w-full h-[250px]">
                <Bar
                  data={usersChartData}
                  options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-black">
              <h2 className="text-lg font-bold mb-4 text-center">{t('admin.dashboard.shipmentsChart')}</h2>
              <div className="w-full h-[250px]">
                <Bar
                  data={shipmentsChartData}
                  options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-black">
              <h2 className="text-lg font-bold mb-4 text-center">{t('admin.dashboard.reportsChart')}</h2>
              <div className="w-full h-[250px]">
                <Bar
                  data={reportsChartData}
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
