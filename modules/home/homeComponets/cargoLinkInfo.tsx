// 'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "next-intl";

const InfoCargo = () => {
    const t = useTranslations();

    return (
        <section className='relative bg-gray-50 py-16' id="what-are">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
                    
                    {/* Imagen a la izquierda */}
                    <div className='col-span-6 flex justify-center items-center'>
                        <Image
                            src={`/images/${t('home.cargoLinkInfo.deliveryImageUrl')}`}
                            alt="Repartidor CargoLink"
                            width={500}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Texto a la derecha */}
                    <div className='col-span-6 flex flex-col justify-center'>
                        <h2 className="text-3xl lg:text-5xl font-semibold text-black text-start mb-4">
                            {t('home.cargoLinkInfo.title')}
                        </h2>

                        <p className='text-black/70 md:text-lg font-normal mb-6 text-start'>
                            {t('home.cargoLinkInfo.description1')}
                        </p>

                        <p className='text-black/70 md:text-lg font-normal mb-8 text-start'>
                            {t('home.cargoLinkInfo.description2')}
                        </p>

                        <Link
                            href="/services"
                            className='text-xl font-medium rounded-full text-white py-3 px-6 bg-primary lg:px-10 w-fit border border-primary hover:bg-transparent hover:text-primary transition'
                        >
                            {t('home.cargoLinkInfo.seeMoreButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InfoCargo;
