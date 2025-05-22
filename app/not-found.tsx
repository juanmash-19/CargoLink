'use client'

import CustomButton from '@/components/atoms/CustomButton'
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NotFoundItem {
    redirectPath: string;
    message: string;
}

type NotFoundDataType = {
    [key: string]: NotFoundItem;
};

const NotFoundData: NotFoundDataType = {
    'user': {
        redirectPath: '/',
        message: 'Cannot access profile, path not found'
    },
    'estado-actual': {
        redirectPath: '/repartidor',
        message: 'Cannot access estado actual, path not found'
    }
};

const getMessage = (obj: NotFoundDataType, current: string[]): [string | undefined, string] => {
    if (current.length === 1) {
        if (!obj[current[0]]) return [undefined, "/"];
        return [obj[current[0]].message, obj[current[0]].redirectPath];
    }
    const aux = current.shift();
    if (!aux || !obj[aux]) return [undefined, "/"];
    return getMessage(obj, current);
};

export default function NotFound(){
    const router = useRouter();
    const currentPath = usePathname().split('/').filter((v) => Boolean(v));
    const t = useTranslations();

    let data: [string | undefined, string] = ["Path not found", "/"];
    if (currentPath.length) {
        data = getMessage(NotFoundData, [...currentPath]);
    }
    
    const menuClick = () =>{
        router.push(data[1]);
    };

    return (
        <div>
            <section className="bg-white">
                <div className="object-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">{t('notFoundPage.title')}</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">{t('notFoundPage.redirectButton')}</p>
                        <p className="mb-4 text-lg font-light text-gray-500 ">{data[0]}</p>
                            <CustomButton 
                                text={t('notFoundPage.redirectButton')}
                                variant='primary'
                                type='button' 
                                onClick={menuClick}
                            />
                    </div>   
                </div>
            </section>
        </div>
    );
}
