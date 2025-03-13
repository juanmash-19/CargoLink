'use client'


import CustomButton from '@/components/atoms/CustomButton'
import { useRouter } from 'next/navigation';

export default function NotFound(){

    
    const router = useRouter();

    const menuClick = () =>{
        router.push('/login')
    };

    return (
        <div>
            <section className="bg-white">
                <div className="object-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, administrator access is not possible. </p>
                            <CustomButton 
                                text='Volver al menu'
                                variant='primary'
                                type='button' 
                                onClick={menuClick}
                            />
                    </div>   
                </div>
            </section>
        </div>
    )
}