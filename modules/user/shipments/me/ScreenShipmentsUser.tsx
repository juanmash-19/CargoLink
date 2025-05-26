'use client'
import React, { useEffect, useState } from 'react';
import ShipmentCardUser from '@/components/molecules/ShipmentCardUser';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { getUserShipments } from '@/libs/ServiceShipment/api-shipment';
import { ShipmentsDAO } from '@/Interfaces/shipment/ShipmentInterface';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

export default function UserShipmentsPage() {
    const [shipments, setShipments] = useState<ShipmentsDAO['shipments'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        const fetchUserShipments = async () => {
            try {
                startLoading();

                const response = await getUserShipments();

                setShipments(response.shipments || []);

                console.log("Shipments:", response.shipments);
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
        window.open('https://maps.app.goo.gl/WYf6YMdX2fEYx5yq9', '_blank');
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
                <h1 className="text-3xl font-bold text-gray-800">
                    {t('user.shipments.manage.title')}
                </h1>
                <button 
                    onClick={() => router.push('/user/shipments/create')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    {t('user.shipments.manage.createButton')}
                </button>
            </div>
            
            {shipments ? (
                <div className="space-y-4">
                    {shipments.map(shipment => (
                        <ShipmentCardUser
                            key={shipment.shipment._id} // Usar un ID único en lugar del índice
                            title={shipment.shipment.title}
                            imageUrl={shipment.shipment.imageUrl}
                            distance= {5}
                            totalCharge={shipment.shipment.cost}
                            totalDistance= {5}
                            profit={shipment.shipment.cost}
                            dimensions={shipment.shipment.dimensions}
                            weight={shipment.shipment.weight}
                            onOpenMap={handleOpenMap}
                            onViewDetails={() => handleViewDetails(shipment.shipment._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">
                        {t('user.shipments.manage.noShipments')}
                    </p>
                    <button 
                        onClick={() => router.push('/user/shipments/create')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {t('user.shipments.manage.createFirstButton')}
                    </button>
                </div>
            )}
        </div>
    );
}