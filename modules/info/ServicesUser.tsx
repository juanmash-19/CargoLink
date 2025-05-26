import React from "react";
import { Truck, MapPin, PackageCheck, Star, UserCog } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ClientServicesPage() {
  const t = useTranslations('userServices');

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        {t('userServices.title')}
      </h1>

      <p className="text-lg text-gray-700 text-center mb-12">
        {t('userServices.description')}
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ServiceCard
          icon={<PackageCheck className="w-8 h-8 text-blue-600" />}
          title={t('serviceCards.requestShipments.title')}
          description={t('serviceCards.requestShipments.description')}
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-green-600" />}
          title={t('userServices.serviceCards.trackPackages.title')}
          description={t('userServices.serviceCards.trackPackages.description')}
        />
        <ServiceCard
          icon={<Truck className="w-8 h-8 text-orange-500" />}
          title={t('userServices.serviceCards.chooseCarrier.title')}
          description={t('userServices.serviceCards.chooseCarrier.description')}
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-yellow-500" />}
          title={t('userServices.serviceCards.rateExperience.title')}
          description={t('userServices.serviceCards.rateExperience.description')}
        />
        <ServiceCard
          icon={<UserCog className="w-8 h-8 text-purple-600" />}
          title={t('userServices.serviceCards.manageProfile.title')}
          description={t('userServices.serviceCards.manageProfile.description')}
        />
        <ServiceCard
          icon={<PackageCheck className="w-8 h-8 text-red-600" />}
          title={t('userServices.serviceCards.shipmentHistory.title')}
          description={t('userServices.serviceCards.shipmentHistory.description')}
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-teal-600" />}
          title={t('userServices.serviceCards.smartLocations.title')}
          description={t('userServices.serviceCards.smartLocations.description')}
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-indigo-500" />}
          title={t('userServices.serviceCards.personalizedSupport.title')}
          description={t('userServices.serviceCards.personalizedSupport.description')}
        />
      </section>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-md text-gray-800 text-center">
        <p className="text-xl font-medium">
          {t('userServices.maximizingProductivity')}
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
