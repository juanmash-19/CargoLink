"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "next-intl";

const FeaturesHomePage = () => {
    const t = useTranslations();

    return (
        <section className="relative bg-gray-50 py-20">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4' id="about-section">
                
                {/* Título */}
                <div className='text-center mb-20'>
                    <h2 className='text-3xl m-4 lg:text-5xl font-semibold text-black lg:max-w-3xl mx-auto'>
                        {t('home.features.title')}
                    </h2>
                </div>

                {/* Cards + Imagen */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-center'>

                    {/* Cards */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
                        {/* Cliente */}
                        <div className='p-8 rounded-3xl bg-gradient-to-b from-black/5 to-white shadow-sm'>
                            <h3 className='text-2xl text-black font-semibold text-center mb-4'>
                                {t('home.features.clientTitle')}
                            </h3>
                            <p className='text-lg font-normal text-black/60 text-center mb-6'>
                                {t('home.features.clientDescription')}
                            </p>
                            <div className='flex justify-center'>
                                <Link
                                    href='/info/services-user'
                                    className='text-center text-lg group duration-300 ease-in-out font-medium text-primary mt-2 overflow-hidden flex items-center relative after:absolute after:w-full after:h-px after:bg-primary after:bottom-0 after:right-0 after:translate-x-full hover:after:translate-x-0'
                                >
                                    {t('home.features.seeMoreButton')}
                                </Link>
                            </div>
                        </div>

                        {/* Transportador */}
                        <div className='p-8 rounded-3xl bg-gradient-to-b from-black/5 to-white shadow-sm'>
                            <h3 className='text-2xl text-black font-semibold text-center mb-4'>
                                {t('home.features.transporterTitle')}
                            </h3>
                            <p className='text-lg font-normal text-black/60 text-center mb-6'>
                                {t('home.features.transporterDescription')}
                            </p>
                            <div className='flex justify-center'>
                                <Link
                                    href='/info/services-transporter'
                                    className='text-center text-lg group duration-300 ease-in-out font-medium text-primary mt-2 overflow-hidden flex items-center relative after:absolute after:w-full after:h-px after:bg-primary after:bottom-0 after:right-0 after:translate-x-full hover:after:translate-x-0'
                                >
                                    {t('home.features.seeMoreButton')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Imagen a la derecha */}
                    <div className="flex justify-center">
                        <Image
                            src={`/images/${t('home.features.RepartidorCargoLinkImageUrl')}`}
                            alt="Camión de reparto"
                            width={500}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesHomePage;
