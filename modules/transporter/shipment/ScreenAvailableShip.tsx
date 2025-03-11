'use client'
import React from 'react';
import ShipmentCard from '@/components/molecules/ShipmentCard';
import { useEffect, useState } from 'react';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { getAvailableShipments } from '@/libs/ServiceShipment/api-shipment';
import { ShipmentsDAO } from '@/Interfaces/shipment/ShipmentInterface';
import { useRouter } from 'next/navigation';

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<ShipmentsDAO['shipments'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();


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
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Fletes Disponibles</h1>
                    {shipments.map((shipment) => (
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
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">No hay fletes disponibles...</h1>
                </>
            )}
        </div>
    );
}