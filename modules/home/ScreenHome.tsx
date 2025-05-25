'use client';

import React from 'react';
import { useAuth } from '@/utils/AuthContext';

// Componentes de la landing (cuando no está logueado)
import StartPage from './homeComponets/StartPage';
import FeaturesHomePage from './homeComponets/Features';
import InfoCargo from './homeComponets/cargoLinkInfo';
import AboutUs from './homeComponets/aboutUs';

// Componentes por rol
import HomeUser from '../user/HomeUser';
import HomeTransporter from '../transporter/HomeTransporter';
import HomeAdmin from '../admin/HomeAdmin';

const ScreemHomePage = () => {
  const { userRole } = useAuth();

  if (userRole === 'user') {
    return <HomeUser />;
  }

  if (userRole === 'transporter') {
    return <HomeTransporter />;
  }

  if (userRole === 'admin') {
    return <HomeAdmin />;
  }

  // Si no está logueado, muestra la landing page
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
        <StartPage />
        <FeaturesHomePage />
        <InfoCargo />
        <AboutUs />
      </main>
    </div>
  );
};

export default ScreemHomePage;
