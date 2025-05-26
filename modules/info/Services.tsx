// app/services/page.tsx

import React from "react";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">{t('services.title')}</h1>
      
      <p className="text-lg text-gray-700 mb-8 text-justify">
        {t('services.description')}
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary">{t('services.features.available')}</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li>{t('services.features.userManagement')}</li>
            <li>{t('services.features.secureAuthentication')}</li>
            <li>{t('services.features.bilateralReviews')}</li>
            <li>{t('services.features.adminPanel')}</li>
            <li>{t('services.features.transporterPanel')}</li>
            <li>{t('services.features.availableShipments')}</li>
            <li>{t('services.features.detailedView')}</li>
            <li>{t('services.features.responsiveInterface')}</li>
            <li>{t('services.features.cloudinaryIntegration')}</li>
          </ul>
        </div>
        <div>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li>{t('services.additionalFeatures.profileSettings')}</li>
            <li>{t('services.additionalFeatures.userManagementPanel')}</li>
            <li>{t('services.additionalFeatures.shipmentManagementPanel')}</li>
            <li>{t('services.additionalFeatures.myShipmentsPanel')}</li>
            <li>{t('services.additionalFeatures.customHomepage')}</li>
            <li>{t('services.additionalFeatures.transporterHomepage')}</li>
            <li>{t('services.additionalFeatures.mapIntegration')}</li>
            <li>{t('services.additionalFeatures.informativePages')}</li>
            <li>{t('services.additionalFeatures.smartRedirects')}</li>
            <li>{t('services.additionalFeatures.dynamicCharts')}</li>
            <li>{t('services.additionalFeatures.visualProfilePanel')}</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded">
          <p className="text-gray-800">
            {t('services.commitment')}
          </p>
        </div>
      </section>
    </main>
  );
}
