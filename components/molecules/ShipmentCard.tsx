import React from 'react';
import Image from 'next/image';
import CustomButton from '../atoms/CustomButton';
import { useTranslations } from "next-intl";

interface ShipmentCardProps {
    imageUrl?: string; // URL de la imagen
    title: string;
    distance: number; // Distancia al flete
    totalCharge: number; // Costo total
    totalDistance: number; // Recorrido total
    profit: number; // Ganancia
    dimensions: {
        height: number;
        width: number;
        length: number;
    };
    weight: number; // Peso
    onOpenMap: () => void; // Función para abrir en el mapa
    onViewDetails: () => void; // Función para ver detalles
    onAccept: () => void; // Función para aceptar el flete
}

export default function ShipmentCard({
    imageUrl = 'https://res.cloudinary.com/dggzv9eld/image/upload/c_fill,w_350,h_200/v1741586977/nuigfomanik2xpsslozk.jpg',
    title,
    distance,
    totalCharge,
    totalDistance,
    profit,
    dimensions,
    weight,
    onOpenMap,
    onViewDetails,
    onAccept,
}: ShipmentCardProps) {
    const t = useTranslations();

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            {/* Imagen */}
            <div className="w-full md:w-1/4 relative">
                <Image
                    src={imageUrl}
                    alt={t('shipmentCard.imageAlt')}
                    width={350} // Ancho especificado
                    height={200} // Alto especificado
                    className="w-full h-48 object-cover"
                />
            </div>

            {/* Información del flete */}
            <div className="w-full md:w-1/2 p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p className="text-gray-600"><span className="font-medium">{t('shipmentCard.distance')}:</span> {distance} km</p>
                    <p className="text-gray-600"><span className="font-medium">{t('shipmentCard.totalCharge')}:</span> ${totalCharge}</p>
                    <p className="text-gray-600"><span className="font-medium">{t('shipmentCard.totalDistance')}:</span> {totalDistance} km</p>
                    <p className="text-gray-600"><span className="font-medium">{t('shipmentCard.profit')}:</span> ${profit}</p>
                    <p className="text-gray-600">
                        <span className="font-medium">{t('shipmentCard.dimensions')}:</span> {dimensions.height} x {dimensions.width} x {dimensions.length} cm
                    </p>
                    <p className="text-gray-600"><span className="font-medium">{t('shipmentCard.weight')}:</span> {weight} kg</p>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="w-full md:w-1/4 p-4 flex flex-col justify-center space-y-4">
                <CustomButton
                    text={t('shipmentCard.openMapButton')}
                    variant='primary'
                    type='button'
                    onClick={onOpenMap}
                />

                <CustomButton
                    text={t('shipmentCard.viewDetailsButton')}
                    variant='secondary'
                    type='button'
                    onClick={onViewDetails}
                />
                
                <CustomButton
                    text={t('shipmentCard.acceptShipmentButton')}
                    variant='green'
                    type='button'
                    onClick={onAccept}
                />
            </div>
        </div>
    );
};
