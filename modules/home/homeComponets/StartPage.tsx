// 'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "next-intl";

const StartPage = () => {
    const t = useTranslations();

    return (
        <section id="home-section" className='bg-gray-50'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
                <div className='grid grid-cols-1 lg:grid-cols-12 items-center'>
                    <div className='col-span-6'>
                        <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-black md:4px lg:text-start text-center">
                            {t('home.startPage.welcome')}
                        </h1>
                        <p className='text-black/55 lg:text-lg font-normal mb-10 lg:text-start text-center'>
                            {t('home.startPage.description')}
                        </p>
                        <div className='md:flex align-middle justify-center lg:justify-start'>
                            <Link
                                href='/register'
                                className='text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-primary hover:text-primary lg:px-14 mr-6 border border-primary hover:bg-transparent'
                            >
                                {t('home.startPage.startNowButton')}
                            </Link>
                            <Link
                                href='/services'
                                className='flex border w-full md:w-auto mt-5 md:mt-0 border-primary justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-primary hover:text-white hover:bg-primary'
                            >
                                {t('home.startPage.seeMoreButton')}
                            </Link>
                        </div>
                    </div>

                    <div className='col-span-6 flex justify-center relative'>
                        <Image
                            src="/images/Camion.png"
                            alt="Repartidor de CargoLink"
                            width={500}
                            height={500}
                            className="object-contain max-h-[500px] w-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StartPage;
