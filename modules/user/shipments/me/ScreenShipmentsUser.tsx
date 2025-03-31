'use client'
import React, { useEffect, useState } from 'react';
import ShipmentCard from '@/components/molecules/ShipmentCard';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { getUserShipments } from '@/libs/ServiceShipment/api-shipment';
import { ShipmentsDAO } from '@/Interfaces/shipment/ShipmentInterface';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export default function UserShipmentsPage() {
    const [shipments, setShipments] = useState<ShipmentsDAO['shipments'] | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();

    useEffect(() => {
        const fetchUserShipments = async () => {
            try {
                startLoading();
                
                const token = Cookies.get('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                // Usamos el tipado automático de jwtDecode
                const decoded = jwtDecode<{ clientId: string }>(token);
                setCurrentUserId(decoded.clientId);
                const response = await getUserShipments();

                setShipments(response.shipments || []);
            } catch (error) {
                console.error('Error:', error);
                setShipments([]);
            } finally {
                stopLoading();
            }
        };

        fetchUserShipments();
    }, [startLoading, stopLoading, router]);

    const handleOpenMap = () => {
        console.log("Abrir en el mapa");
    };

    const handleViewDetails = (id: string) => {
        router.push(`/user/shipments/me/${id}`)
        console.log("Ver detalles");
    };

    const handleAccept = () => {
        console.log("Aceptar flete");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Mis Envíos</h1>
                <button 
                    onClick={() => router.push('/user/shipments/create')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Crear Nuevo Envío
                </button>
            </div>
            
            {shipments ? (
                <div className="space-y-4">
                    {shipments.map(shipment => (
                        <ShipmentCard
                            key={shipment._id} // Usar un ID único en lugar del índice
                            title={shipment.title}
                            imageUrl={shipment.imageUrl}
                            distance= {5}
                            totalCharge={shipment.cost}
                            totalDistance= {5}
                            profit={shipment.cost}
                            dimensions={shipment.dimensions}
                            weight={shipment.weight}
                            onOpenMap={handleOpenMap}
                            onViewDetails={() => handleViewDetails(shipment._id)}
                            onAccept={handleAccept}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">No tienes envíos creados</p>
                    <button 
                        onClick={() => router.push('/user/shipments/create')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Crear Primer Envío
                    </button>
                </div>
            )}
        </div>
    );
}