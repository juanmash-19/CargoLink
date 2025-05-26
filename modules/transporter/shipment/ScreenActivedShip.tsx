'use client'
import React from 'react';
import DeliveryShipmentCard from '@/components/molecules/DeliveryShipmentCard';
import { useEffect, useState } from 'react';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { getAcceptedShipments } from '@/libs/ServiceShipment/api-shipment';
import { ShipmentsDAO } from '@/Interfaces/shipment/ShipmentInterface';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";
import CustomAlert from '@/components/atoms/CustomAlert';
import CustomButton from '@/components/atoms/CustomButton';
import { confirmShipmentTransit, confirmShipmentDelivery } from "@/libs/ServiceTransporter/api-transporter";

export default function ScreenActivedShip() {
    const [shipments, setShipments] = useState<ShipmentsDAO['shipments'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();
    
    // Estados para alertas
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');
    const [shipmentToConfirm, setShipmentToConfirm] = useState<string | null>(null);
    const [actionType, setActionType] = useState<'transit' | 'delivery'>('delivery');

    useEffect(() => {
        const fetchShipment = async () => {
            try{
                startLoading();
                // Usar la nueva función para obtener los envíos aceptados
                const response = await getAcceptedShipments();                if (response.shipments) {
                    setShipments(response.shipments);
                } else {
                    setAlertMessage(t('transporter.shipments.active.noActiveShipmentsMessage'));
                    setAlertType('error');
                    setShowAlert(true);
                }
            } catch (error) {
                setAlertMessage(t('transporter.shipments.active.fetchErrorMessage'));
                setAlertType('error');
                setShowAlert(true);
            } finally {
                stopLoading();
            }
        };

        fetchShipment();
    }, [startLoading, stopLoading]);

    const handleOpenMap = () => {
        console.log("Abrir en el mapa");
    };

    const handleViewDetails = (id: string) => {
        router.push(`/transporter/shipments/${id}`)
        console.log("Ver detalles");
    };    const handleConfirmTransit = (id: string) => {
        setShipmentToConfirm(id);
        setActionType('transit');
        setAlertMessage(t('transporter.shipments.active.transitConfirmationMessage'));
        setAlertType('options');
        setShowAlert(true);
    };

    const handleConfirmDelivery = (id: string) => {
        setShipmentToConfirm(id);
        setActionType('delivery');
        setAlertMessage(t('transporter.shipments.active.deliveryConfirmationMessage'));
        setAlertType('options');
        setShowAlert(true);
    };

    const confirmAction = async () => {
        if (!shipmentToConfirm) return;
        
        try {
            startLoading();
              if (actionType === 'transit') {
                await confirmShipmentTransit(shipmentToConfirm);
                setAlertMessage(t('transporter.shipments.active.transitSuccessMessage'));
            } else {
                await confirmShipmentDelivery(shipmentToConfirm);
                setAlertMessage(t('transporter.shipments.active.deliverySuccessMessage'));
            }
            
            setAlertType('success');
            setShowAlert(true);
            
            // Refresh shipments list after action
            const response = await getAcceptedShipments();
            if (response.shipments) {
                setShipments(response.shipments);
            }
            
        } catch (error) {
            setAlertMessage(actionType === 'transit' ? t('transporter.shipments.active.transitErrorMessage') : t('transporter.shipments.active.deliveryErrorMessage'));
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
            setShipmentToConfirm(null);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        setShipmentToConfirm(null);
    };

    return (
        <div className="p-6">
            {shipments && shipments.length > 0 ? (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('transporter.shipments.active.title')}
                    </h1>
                    {shipments.map((shipment) => (
                        <DeliveryShipmentCard
                            key={shipment.shipment._id}
                            title={shipment.shipment.title}
                            imageUrl={shipment.shipment.imageUrl}
                            distance={5}
                            totalCharge={shipment.shipment.cost}
                            totalDistance={5}
                            profit={shipment.shipment.cost}
                            dimensions={shipment.shipment.dimensions}
                            weight={shipment.shipment.weight}
                            status={shipment.shipment.status}
                            onOpenMap={handleOpenMap}
                            onViewDetails={() => handleViewDetails(shipment.shipment._id)}
                            onConfirmDelivery={
                                shipment.shipment.status === 'in_transit' 
                                ? () => handleConfirmDelivery(shipment.shipment._id) 
                                : undefined
                            }
                            onConfirmTransit={
                                shipment.shipment.status === 'accepted' 
                                ? () => handleConfirmTransit(shipment.shipment._id) 
                                : undefined
                            }
                        />
                    ))}
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('transporter.shipments.active.title')}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {t('transporter.shipments.active.noShipments')}
                    </p>
                </>
            )}

            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={handleAlertClose}
                >
                    {alertType === 'options' && (
                        <div className="flex gap-2 justify-end">
                            <CustomButton
                                text={t('admin.shipments.manage.cancelButton')}
                                variant="danger"
                                type="button"
                                onClick={handleAlertClose}
                            />
                            <CustomButton
                                text={t('admin.shipments.manage.confirmButton')}
                                variant="green"
                                type="button"
                                onClick={confirmAction}
                            />
                        </div>
                    )}
                </CustomAlert>
            )}
        </div>
    );
}
