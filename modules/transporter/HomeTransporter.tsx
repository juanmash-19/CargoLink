'use client';

import { useAuth } from '@/utils/AuthContext';
import Image from 'next/image';
import { useTranslations } from "next-intl";

export default function HomeTransportador() {
  const { userName, userLastname } = useAuth();
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-green-50 to-white">
      <div className="mb-8 w-full flex justify-center">
        <div className="w-full max-w-2xl">
          <Image
            src="/images/colaboradores.png"
            alt="Transportador"
            width={800}
            height={400}
            className="rounded-2xl shadow-xl border-4 border-green-200 w-full h-auto object-cover"
            priority
          />
        </div>
      </div>      <h1 className="text-4xl font-extrabold mb-3 text-green-900 text-center drop-shadow">
        {t('transporter.home.welcome')}, {userName} {userLastname}!
      </h1>
      <h2 className="text-2xl mb-2 text-green-700 text-center">
        {t('transporter.home.loggedInAs')} <span className="font-semibold text-green-600">{t('transporter.home.transporter')}</span>.
      </h2>
      <p className="text-gray-700 text-center max-w-xl mt-2 text-lg">
        {t('transporter.home.description')} <span className="font-semibold text-green-700">{t('transporter.home.checkFreights')}</span>, 
        <span className="font-semibold text-green-700"> {t('transporter.home.trackShipments')}</span>, 
        <span className="font-semibold text-green-700"> {t('transporter.home.reviewHistory')}</span> {t('transporter.home.accessInfo')}
      </p>
    </div>
  );
}