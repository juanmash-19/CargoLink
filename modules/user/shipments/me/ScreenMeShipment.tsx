'use client'
import { useParams } from "next/navigation";
import { ShipmentDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { useEffect, useState } from 'react';
import { useLoadingStore } from "@/store/LoadingSpinner";
import { getShipment, setActivatedShipment, setCancelledShipment } from "@/libs/ServiceShipment/api-shipment";
import CustomButton from "@/components/atoms/CustomButton";
import BasicTextCardProps from "@/components/atoms/BasicTextCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ShipmentDetailPage(){
    const params = useParams();
    const idShipment = params?.shipment;
    const [shipment, setShipment] = useState<ShipmentDAO['shipment'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        const fetchShipment = async () => {
            if (!idShipment) return; // Si no hay ID, no hacemos nada

            try {
                startLoading(); // Activa el spinner de carga
                const response = await getShipment(idShipment as string);

                if (response.shipment._id) {
                    setShipment(response.shipment); // Actualiza el estado con los datos del envío
                } else {
                    console.error('No se encontró el envío');
                    alert('No se encontró el envío');
                }
            } catch (error) {
                console.error('Error al obtener el envío:', error);
                alert('Error al obtener el envío');
            } finally {
                stopLoading(); // Desactiva el spinner de carga
            }
        };

        fetchShipment(); // Ejecuta la función para obtener los datos
    }, [idShipment, startLoading, stopLoading]); // Dependencias: id, startLoading, stopLoading

    if (!shipment) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga si no hay datos
    }

    const acceptedClick = async () => {
        try{
            startLoading();
            const response = await setActivatedShipment(idShipment as string);
            if (response.message){
                alert("¡Flete confirmado! Aguarde hasta que un transportista acepte su pedido.")
                router.push('/')
            }
        } catch (error) {
            
            console.error('Error al actualizar el estado del envío:', error);
            alert('Error al actualizar el estado el envío');
        } finally{
            stopLoading();
        }
    }

    const cancelledClick = async () => {
        try{
            startLoading();
            const response = await setCancelledShipment(idShipment as string);
            if (response.message){
                alert("¡Flete cancelado!")
                router.push('/')
            }
        }
        catch (error) {
            console.error('Error al actualizar el estado del envío:', error);
            alert('Error al actualizar el estado el envío');
        }
        finally{
            stopLoading();
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary-300">
                {t('user.shipments.details.title')}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna 1: Información básica */}
                <div className="space-y-4">
                    {shipment.imageUrl && (
                        <>
                            <h2 className="text-lg font-semibold text-gray-600">
                                {t('user.shipments.details.image')}
                            </h2>
                            <div className="flex justify-center">
                                <img
                                    src={shipment.imageUrl}
                                    alt="Imagen del Flete"
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                        </>
                    )}
                    <BasicTextCardProps
                        title={t('user.shipments.details.generalInfo')}
                        subtitles={[
                            { label: t('user.shipments.details.id'), content: shipment._id },
                            { label: t('user.shipments.details.titleg'), content: shipment.title },
                            { label: t('user.shipments.details.description'), content: shipment.description },
                            { label: t('user.shipments.details.status'), content: shipment.status },
                        ]}
                    />
                </div>
    
                <div className="space-y-4">

                    <BasicTextCardProps
                        title={t('user.shipments.details.addresses')}
                        subtitles={[
                            { label: t('user.shipments.details.pickupAddress'), content: shipment.pickupAddress },
                            { label: t('user.shipments.details.deliveryAddress'), content: shipment.deliveryAddress },
                        ]}
                    />
                    
                    <BasicTextCardProps
                        title={t('user.shipments.details.technicalDetails')}
                        subtitles={[
                            { label: t('user.shipments.details.weight'), content: `${shipment.weight} kg` },
                            { label: t('user.shipments.details.dimensions'), content: `${shipment.dimensions?.height}x${shipment.dimensions?.width}x${shipment.dimensions?.length} cm` },
                            ...(shipment.status !== 'pending' ? [{ label: t('user.shipments.details.cost'), content: `$ ${shipment.cost}` }] : []),
                        ]}
                    />
    
                    {shipment.transporter && (
                        <BasicTextCardProps
                            title={t('user.shipments.details.transporter')}
                            subtitles={[
                                { label: t('user.shipments.details.transporterName'), content: shipment.transporter.name },
                                { label: t('user.shipments.details.transporterEmail'), content: shipment.transporter.email },
                                { label: t('user.shipments.details.transporterPhone'), content: shipment.transporter.phone },
                            ]}
                        />
                    )}

                    {shipment.status === 'pending' && (
                        <div>
                            <BasicTextCardProps
                                title={t('user.shipments.details.confirmShipment')}
                                subtitles={[
                                    { label: t('user.shipments.details.cost'), content: `$ ${shipment.cost}` },
                                ]}
                            />
                            <CustomButton
                                text={t('user.shipments.details.confirmButton')}
                                variant="primary"
                                onClick={acceptedClick}
                            />
                        </div>
                    )}

                    

                    {shipment.status === 'activated' && (
                        <div>
                            <BasicTextCardProps
                                title={t('user.shipments.details.cancelShipment')}
                                subtitles={[
                                    { label: t('user.shipments.details.requirements'), content: t('user.shipments.details.cancelRequirements') },
                                ]}
                            />
                            <CustomButton
                                text={t('user.shipments.details.cancelButton')}
                                variant="danger"
                                onClick={cancelledClick}
                            />
                        </div>
                    )}

                    

                </div>
            </div>
        </div>
    );
}