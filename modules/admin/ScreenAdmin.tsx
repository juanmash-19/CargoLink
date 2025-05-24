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

// Definir el tipo de tarjeta con variantes restringidas
type VariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

interface CardType {
  title: string;
  value: string;
  variant: VariantType;
  icon: string;
  onClick?: () => void; // Prop para manejar el clic
}

export default function AdminPage() {
  const t = useTranslations();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [totals, setTotals] = useState({ totalUsers: 0, totalShipments: 0, totalReports: 0 });
  const router = useRouter(); // Hook para redirigir

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getGeneralStats();
        setTotals({
          totalUsers: response.totalUsers,
          totalShipments: response.totalShipments,
          totalReports: response.totalReports,
        }); // Actualizamos el estado con los totales
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  const chartData = {
    envios: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Ventas', data: [1200, 1900, 3000, 5000, 7000], backgroundColor: 'rgba(54, 162, 235, 0.5)' }],
    },
    usuarios: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Usuarios', data: [150, 180, 220, 300, 450], backgroundColor: 'rgba(255, 99, 132, 0.5)' }],
    },
    reportes: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{ label: 'Problemas Reportados', data: [10, 15, 8, 12, 18], backgroundColor: 'rgba(255, 206, 86, 0.5)' }],
    },
  };

  const cardsData: CardType[] = [
    { 
      title: t('admin.dashboard.totalShipments'), 
      value: totals.totalShipments.toString(), 
      variant: 'primary', 
      icon: '📦', 
      onClick: () => router.push('/admin/shipments') // Redirige a /admin/envios
    },
    { 
      title: t('admin.dashboard.totalUsers'), 
      value: totals.totalUsers.toString(), 
      variant: 'secondary', 
      icon: '👥', 
      onClick: () => router.push('/admin/users') // Redirige a /admin/usuarios
    },
    { 
      title: t('admin.dashboard.pendingReports'), 
      value: totals.totalReports.toString(), 
      variant: 'danger', 
      icon: '📋', 
      onClick: () => router.push('/admin/reportes') // Redirige a /admin/reportes
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
      {selectedCard && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">{selectedCard.title}</h2>
          <p className="text-lg">{selectedCard.value}</p>
        </div>
      )}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">{t('admin.dashboard.shipmentsChart')}</h2>
        <Bar data={chartData.envios} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">{t('admin.dashboard.usersChart')}</h2>
        <Bar data={chartData.usuarios} />
      </div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">{t('admin.dashboard.reportsChart')}</h2>
        <Bar data={chartData.reportes} />
      </div>
    </div>
  );
}
