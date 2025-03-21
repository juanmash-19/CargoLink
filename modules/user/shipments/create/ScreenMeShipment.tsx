'use client'
import { useParams } from "next/navigation";
import { ShipmentDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { useEffect, useState } from 'react';
import { useLoadingStore } from "@/store/LoadingSpinner";
import { getShipment, setActivatedShipment } from "@/libs/ServiceShipment/api-shipment";
import CustomButton from "@/components/atoms/CustomButton";
import BasicTextCardProps from "@/components/atoms/BasicTextCard";
import { useRouter } from "next/navigation";

export default function ShipmentDetailPage(){
    const params = useParams();
    const idShipment = params.shipment;
    const [shipment, setShipment] = useState<ShipmentDAO | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();

    useEffect(() => {
        const fetchShipment = async () => {
            if (!idShipment) return; // Si no hay ID, no hacemos nada

            try {
                startLoading(); // Activa el spinner de carga
                const response = await getShipment(idShipment as string);

                if (response._id) {
                    setShipment(response); // Actualiza el estado con los datos del envío
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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary-300">Detalles del Flete</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna 1: Información básica */}
                <div className="space-y-4">
                    <BasicTextCardProps
                        title="Información General"
                        subtitles={[
                            { label: "ID", content: shipment._id },
                            { label: "Título", content: shipment.title },
                            { label: "Descripción", content: shipment.description },
                            { label: "Estado", content: shipment.status },
                        ]}
                    />

                    <BasicTextCardProps
                        title="Direcciones"
                        subtitles={[
                            { label: "Recogida", content: shipment.pickupAddress },
                            { label: "Entrega", content: shipment.deliveryAddress },
                        ]}
                    />
                </div>
    
                <div className="space-y-4">
                    
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

                </div>
            </div>
        </div>
    );
}