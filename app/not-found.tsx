'use client'


import CustomButton from '@/components/atoms/CustomButton'
import { useRouter, usePathname } from 'next/navigation';

const NotFoundData = {
    'user': {
        redirectPath: '/',
        message: 'Cannot access profile, path not found'
    },
    'estado-actual': {
        redirectPath: '/repartidor',
        message: 'Cannot access estado actual, path not found'
    }
}

const getMessage = (obj, current: any[]) => {
    if (current.length == 1) {
        if (!obj[current[0]]) return [undefined, "/"]
        const d = [obj[current[0]]['message'], obj[current[0]]['redirectPath']]
        return d
    }
    const aux = current.shift()
    if (!obj[aux]) return [undefined, "/"]
    return getMessage(obj[aux], current)
}
export default function NotFound(){

    
    const router = useRouter();
    const currentPath = usePathname().split('/').filter((v) => {
        if (v) return true;
        return false    
    })

    let data: any[]
    if (currentPath){
        data = getMessage(NotFoundData, currentPath)
    }
    
    
    const menuClick = () =>{
        router.push(data[1])
    };

    return (
        <div>
            <section className="bg-white">
                <div className="object-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 ">{data[0] || "Path not found"}</p>
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