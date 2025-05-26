import React from "react";
import {
  ClipboardCheck,
  Route,
  Wallet,
  BarChart3,
  MapPin,
  Star,
  Clock,
  Settings,
} from "lucide-react";
import { useTranslations } from 'next-intl';

export default function TransporterServicesPage() {
  const t = useTranslations('services.transporterServices');

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        {t('transporterServices.title')}
      </h1>

      <p className="text-lg text-gray-700 text-center mb-12">
        {t('transporterServices.description')}
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ServiceCard
          icon={<ClipboardCheck className="w-8 h-8 text-blue-600" />}
          title={t('transporterServices.serviceCards.acceptOrders.title')}
          description={t('transporterServices.serviceCards.acceptOrders.description')}
        />
        <ServiceCard
          icon={<Route className="w-8 h-8 text-green-600" />}
          title={t('transporterServices.serviceCards.optimizeRoutes.title')}
          description={t('transporterServices.serviceCards.optimizeRoutes.description')}
        />
        <ServiceCard
          icon={<Wallet className="w-8 h-8 text-amber-500" />}
          title={t('transporterServices.serviceCards.securePayments.title')}
          description={t('transporterServices.serviceCards.securePayments.description')}
        />
        <ServiceCard
          icon={<BarChart3 className="w-8 h-8 text-purple-600" />}
          title={t('transporterServices.serviceCards.consultStatistics.title')}
          description={t('transporterServices.serviceCards.consultStatistics.description')}
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-red-500" />}
          title={t('transporterServices.serviceCards.realTimeLocation.title')}
          description={t('transporterServices.serviceCards.realTimeLocation.description')}
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-yellow-500" />}
          title={t('transporterServices.serviceCards.receiveRatings.title')}
          description={t('transporterServices.serviceCards.receiveRatings.description')}
        />
        <ServiceCard
          icon={<Clock className="w-8 h-8 text-cyan-600" />}
          title={t('transporterServices.serviceCards.totalFlexibility.title')}
          description={t('transporterServices.serviceCards.totalFlexibility.description')}
        />
        <ServiceCard
          icon={<Settings className="w-8 h-8 text-indigo-500" />}
          title={t('transporterServices.serviceCards.profileManagement.title')}
          description={t('transporterServices.serviceCards.profileManagement.description')}
        />
      </section>

      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-md text-gray-800 text-center">
        <p className="text-xl font-medium">
          {t('transporterServices.maximizingProductivity')}
        </p>
      </div>
    </main>
  );
}

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex items-start space-x-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
      <div>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
