'use client';

import { useAuth } from '@/utils/AuthContext';
import Image from 'next/image';
import { useTranslations } from "next-intl";

export default function HomeAdmin() {
  const { userName, userLastname } = useAuth();
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="mb-8">
        <Image
          src={t('admin.home.url')}
          alt="Administrador"
          width={280}
          height={280}
          className="rounded-2xl shadow-2xl"
          priority
        />
      </div>      <h1 className="text-4xl font-extrabold mb-3 text-blue-900 text-center">
        {t('admin.home.welcome')}, {userName} {userLastname}!
      </h1>
      <h2 className="text-2xl mb-2 text-blue-700 text-center">
        {t('admin.home.loggedInAs')} <span className="font-semibold text-blue-600">{t('admin.home.administrator')}</span>.
      </h2>
      <p className="text-gray-700 text-center max-w-xl mt-2 text-lg">
        {t('admin.home.description')} <span className="font-semibold text-blue-700">{t('admin.home.manageUsers')}</span>, 
        <span className="font-semibold text-blue-700"> {t('admin.home.manageShipments')}</span>, 
        <span className="font-semibold text-blue-700"> {t('admin.home.manageReports')}</span>, 
        {t('admin.home.accessFunctions')}
      </p>
    </div>
  );
}