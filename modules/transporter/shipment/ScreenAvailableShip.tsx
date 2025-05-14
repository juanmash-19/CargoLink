'use client'
import React from 'react';
import ShipmentCard from '@/components/molecules/ShipmentCard';
import { useEffect, useState } from 'react';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { getAvailableShipments } from '@/libs/ServiceShipment/api-shipment';
import { ShipmentsDAO } from '@/Interfaces/shipment/ShipmentInterface';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<ShipmentsDAO['shipments'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        const fetchShipment = async () => {
            try{
                startLoading();
                const response = await getAvailableShipments();

                if (response.shipments) {
                    setShipments(response.shipments); // Actualiza el estado con los datos del envío
                } else {
                    console.error('No se encontró el envío');
                    alert('No se encontró el envío');
                }
            } catch (error) {
                console.error('Error al obtener los envios:', error);
                alert('Error al obtener los envios');
            } finally {
                stopLoading(); // Desactiva el spinner de carga
            }
        };

        fetchShipment(); // Ejecuta la función para obtener los datos

    }, [startLoading, stopLoading]); // Dependencias: startLoading, stopLoading

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
            {shipments ? (
                <>
                    {console.log(shipments)}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('transporter.shipments.available.title')}
                    </h1>
                    {shipments.map((shipment) => (
                        <ShipmentCard
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
                            onAccept={handleAccept}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('transporter.shipments.available.noShipments')}
                    </h1>
                </>
            )}
        </div>
    );
}