import React from 'react';
import Link from 'next/link';
import StartPage from './homeComponets/StartPage';
import FeaturesHomePage from './homeComponets/Features';
import InfoCargo from './homeComponets/cargoLinkInfo';
import AboutUs from './homeComponets/aboutUs';

const ScreemHomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
          <StartPage />
          <FeaturesHomePage />
          <InfoCargo />
          <AboutUs/>
      </main>
    </div>
  );
};

export default ScreemHomePage;