'use client'

import Link from 'next/link'

import CustomButton from '@/components/atoms/CustomButton'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function NotFound(){

    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const router = useRouter();

    const menuClick = () =>{
        router.push('/')
    };

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="object-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        {/* <a href="#" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-primary-100 text-center my-4">Back to Homepage</a> */}
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