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
import CustomAlert from "@/components/atoms/CustomAlert";

export default function ScreenMeAdminShipments(){
    const params = useParams();
    const idShipment = params.shipment;
    const [shipment, setShipment] = useState<ShipmentDAO['shipment'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();

    // Estados para las alertas
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    useEffect(() => {
        const fetchShipment = async () => {
            if (!idShipment) return;

            try {
                startLoading();
                const response = await getShipmentById(idShipment as string);

                if (response.shipment._id) {
                    setShipment(response.shipment);
                } else {
                    setAlertMessage('No se encontró el envío');
                    setAlertType('error');
                    setShowAlert(true);
                }
            } catch (error) {
                setAlertMessage('Error al obtener el envío');
                setAlertType('error');
                setShowAlert(true);
            } finally {
                stopLoading();
            }
        };

        fetchShipment();
    }, [idShipment, startLoading, stopLoading]);

    const acceptedClick = async () => {
        try{
            startLoading();
            const response = await setActivatedShipment(idShipment as string);
            if (response.message){
                setAlertMessage("¡Flete confirmado! Aguarde hasta que un transportista acepte su pedido.");
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => router.push('/'), 2000);
            }
        } catch (error) {
            setAlertMessage('Error al actualizar el estado el envío');
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
                setAlertMessage("¡Flete cancelado!");
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => router.push('/'), 2000);
            }
        }
        catch (error) {
            setAlertMessage('Error al actualizar el estado el envío');
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
            <h1 className="text-3xl font-bold text-primary-300">Detalles del Flete</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna 1: Información básica */}
                <div className="space-y-4">
                    {shipment.imageUrl && (
                        <>
                            <h2 className="text-lg font-semibold text-gray-600">Imagen del Flete</h2>
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
                        title="Información General"
                        subtitles={[
                            { label: "ID", content: shipment._id },
                            { label: "Título", content: shipment.title },
                            { label: "Descripción", content: shipment.description },
                            { label: "Estado", content: shipment.status },
                        ]}
                    />
                </div>
    
                <div className="space-y-4">
                    <BasicTextCardProps
                        title="Direcciones"
                        subtitles={[
                            { label: "Recogida", content: shipment.pickupAddress },
                            { label: "Entrega", content: shipment.deliveryAddress },
                        ]}
                    />
                    
                    {shipment.status === 'pending' ? (
                        <BasicTextCardProps
                            title="Detalles Técnicos"
                            subtitles={[
                                { label: "Peso", content: `${shipment.weight} kg` },
                                { label: "Dimensiones", content: `${shipment.dimensions?.height}x${shipment.dimensions?.width}x${shipment.dimensions?.length} cm` },
                            ]}
                            />
                    ) : (
                        <BasicTextCardProps
                            title="Detalles Técnicos"
                            subtitles={[
                                { label: "Peso", content: `${shipment.weight} kg` },
                                { label: "Dimensiones", content: `${shipment.dimensions?.height}x${shipment.dimensions?.width}x${shipment.dimensions?.length} cm` },
                                { label: "Costo", content: `$ ${shipment.cost}` },
                            ]}
                        />
                    )}
    
                    {shipment.transporter && (
                        <BasicTextCardProps
                            title="Transportista"
                            subtitles={[
                                { label: "Nombre", content: shipment.transporter.name },
                                { label: "Email", content: shipment.transporter.email },
                                { label: "Teléfono", content: shipment.transporter.phone },
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
                                text="Confirmar"
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
                                text="Cancelar"
                                variant="danger"
                                onClick={cancelledClick}
                            />
                        </div>
                    )}
                    
                    <CustomButton
                        text='Volver'
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