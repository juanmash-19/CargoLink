'use client'
import { useParams } from "next/navigation";
import { ShipmentDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { useEffect, useState } from 'react';
import { useLoadingStore } from "@/store/LoadingSpinner";
import { setActivatedShipment, setCancelledShipment } from "@/libs/ServiceShipment/api-shipment";
import { getShipmentById } from "@/libs/ServiceAdmin/api-admin";
import CustomButton from "@/components/atoms/CustomButton";
import BasicTextCardProps from "@/components/atoms/BasicTextCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CustomAlert from "@/components/atoms/CustomAlert";

export default function ScreenMeAdminShipments(){
    const params = useParams();
    const idShipment = params?.shipment;
    const [shipment, setShipment] = useState<ShipmentDAO['shipment'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();

    // Estados para las alertas
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    useEffect(() => {
        const fetchShipment = async () => {
            if (!idShipment) return;

            try {
                startLoading();
                const response = await getShipmentById(idShipment as string);                if (response.shipment._id) {
                    setShipment(response.shipment);
                    console.log('Shipment:', response.shipment);
                } else {
                    setAlertMessage(t('admin.shipments.me.notFoundMessage'));
                    setAlertType('error');
                    setShowAlert(true);
                }
            } catch (error) {
                setAlertMessage(t('admin.shipments.me.fetchErrorMessage'));
                setAlertType('error');
                setShowAlert(true);
            } finally {
                stopLoading();
            }
        };

        fetchShipment();
    }, [idShipment, startLoading, stopLoading]);    const acceptedClick = async () => {
        try{
            startLoading();
            const response = await setActivatedShipment(idShipment as string);
            if (response.message){
                setAlertMessage(t('admin.shipments.me.confirmSuccessMessage'));
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => router.push('/'), 2000);
            }
        } catch (error) {
            setAlertMessage(t('admin.shipments.me.updateErrorMessage'));
            setAlertType('error');
            setShowAlert(true);
        } finally{
            stopLoading();
        }
    }

    const cancelledClick = async () => {
        try{
            startLoading();
            const response = await setCancelledShipment(idShipment as string);
            if (response.message){
                setAlertMessage(t('admin.shipments.me.cancelSuccessMessage'));
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => router.push('/'), 2000);
            }
        }
        catch (error) {
            setAlertMessage(t('admin.shipments.me.cancelErrorMessage'));
            setAlertType('error');
            setShowAlert(true);
        }
        finally{
            stopLoading();
        }
    }

    const handleBack = () =>{
        router.back()
    }

    if (!shipment) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary-300">{t('admin.shipments.details.title')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna 1: Información básica */}
                <div className="space-y-4">
                    {shipment.imageUrl && (
                        <>
                            <h2 className="text-lg font-semibold text-gray-600">{t('admin.shipments.details.image')}</h2>
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
                        title={t('admin.shipments.details.generalInfo')}
                        subtitles={[
                            { label: t('admin.shipments.details.id'), content: shipment._id },
                            { label: t('admin.shipments.details.titleg'), content: shipment.title },
                            { label: t('admin.shipments.details.description'), content: shipment.description },
                            { label: t('admin.shipments.details.status'), content: shipment.status },
                        ]}
                    />
                    
                    {/* Añadir información del cliente (usuario) */}
                    {shipment.client && (
                        <BasicTextCardProps
                            title="Cliente"
                            subtitles={[
                                { label: t('admin.shipments.details.transporterName'), content: shipment.client.name},
                                { label: t('admin.shipments.details.transporterEmail'), content: shipment.client.email},
                                { label: t('admin.shipments.details.transporterPhone'), content: shipment.client.phone},
                            ]}
                        />
                    )}
                </div>
    
                <div className="space-y-4">
                    <BasicTextCardProps
                        title={t('admin.shipments.details.addresses')}
                        subtitles={[
                            { label: t('admin.shipments.details.pickupAddress'), content: shipment.pickupAddress },
                            { label: t('admin.shipments.details.deliveryAddress'), content: shipment.deliveryAddress },
                        ]}
                    />
                    
                    {shipment.status === 'pending' ? (
                        <BasicTextCardProps
                            title={t('admin.shipments.details.technicalDetails')}
                            subtitles={[
                                { label: t('admin.shipments.details.weight'), content: `${shipment.weight} kg` },
                                { label: t('admin.shipments.details.dimensions'), content: `${shipment.dimensions?.height}x${shipment.dimensions?.width}x${shipment.dimensions?.length} cm` },
                            ]}
                            />
                    ) : (
                        <BasicTextCardProps
                            title={t('admin.shipments.details.technicalDetails')}
                            subtitles={[
                                { label: t('admin.shipments.details.weight'), content: `${shipment.weight} kg` },
                                { label: t('admin.shipments.details.dimensions'), content: `${shipment.dimensions?.height}x${shipment.dimensions?.width}x${shipment.dimensions?.length} cm` },
                                { label: "Costo", content: `$ ${shipment.cost}` },
                            ]}
                        />
                    )}
    
                    {shipment.transporter && (
                        <BasicTextCardProps
                            title={t('admin.shipments.details.transporter')}
                            subtitles={[
                                { label: t('admin.shipments.details.transporterName'), content: shipment.transporter.name },
                                { label: t('admin.shipments.details.transporterEmail'), content: shipment.transporter.email },
                                { label: t('admin.shipments.details.transporterPhone'), content: shipment.transporter.phone },
                            ]}
                        />
                    )}

                    {shipment.status === 'pending' && (
                        <div>
                            <BasicTextCardProps
                                title="Confirma el flete"
                                subtitles={[
                                    { label: "Costo", content: `$ ${shipment.cost}` },
                                ]}
                            />
                            <CustomButton
                                text={t('admin.shipments.details.confirmButton')}
                                variant="primary"
                                onClick={acceptedClick}
                            />
                        </div>
                    )}

                    {shipment.status === 'activated' && (
                        <div>
                            <BasicTextCardProps
                                title="Cancelar el flete"
                                subtitles={[
                                    { label: "Requisitos", content: `Puedes cancelar el flete automaticamente mientras ningun repartidor lo haya aceptado.` },
                                ]}
                            />
                            <CustomButton
                                text={t('admin.shipments.details.cancelButton')}
                                variant="danger"
                                onClick={cancelledClick}
                            />
                        </div>
                    )}
                    
                    <CustomButton
                        text={t('admin.shipments.details.backButton')}
                        variant='secondary'
                        type='button'
                        onClick={handleBack}
                    />
                </div>
            </div>

            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
}