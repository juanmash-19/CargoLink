'use client'
import { useParams } from "next/navigation";
import { ShipmentDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { useEffect, useState } from 'react';
import { useLoadingStore } from "@/store/LoadingSpinner";
import CustomButton from "@/components/atoms/CustomButton";
import BasicTextCardProps from "@/components/atoms/BasicTextCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CustomAlert from "@/components/atoms/CustomAlert";
import CustomModal from "@/components/molecules/CustomModal";
import { createReport } from "@/libs/ServiceReport/api-report";
import { getTransporterShipment, acceptShipment } from "@/libs/ServiceTransporter/api-transporter";

export default function TransporterShipmentDetailPage() {
    const params = useParams();
    const idShipment = params?.shipment;
    const [shipment, setShipment] = useState<ShipmentDAO['shipment'] | null>(null);
    const { startLoading, stopLoading } = useLoadingStore();
    const router = useRouter();
    const t = useTranslations();

    // Estados para alertas
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');

    // Estados para el reporte
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [reportCategory, setReportCategory] = useState('');

    useEffect(() => {
        const fetchShipment = async () => {
            if (!idShipment) return;

            try {
                startLoading();
                // Usar el servicio API para transportadores desde el archivo api-transporter
                const response = await getTransporterShipment(idShipment as string);

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

        fetchShipment(); // Ejecuta la función para obtener los datos
    }, [idShipment, startLoading, stopLoading]); // Dependencias: id, startLoading, stopLoading

    if (!shipment) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga si no hay datos
    }

    const acceptShipmentClick = async () => {
        try {
            startLoading();
            const response = await acceptShipment(idShipment as string);
            
            if (response.message) {
                setAlertMessage("¡Envío aceptado! Ahora es tu responsabilidad completar este flete.");
                setAlertType('success');
                setShowAlert(true);
                // Actualizar el estado del envío localmente
                setShipment(prev => prev ? {...prev, status: 'accepted'} : null);
            }
        } catch (error) {
            setAlertMessage('Error al aceptar el envío');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    }

    const handleSubmitReport = async () => {
        if (!reportTitle || !reportDescription || !reportCategory) {
            setAlertMessage('Por favor complete todos los campos del reporte');
            setAlertType('error');
            setShowAlert(true);
            return;
        }

        try {
            startLoading();
            
            const reportData = {
                title: reportTitle,
                description: reportDescription,
                category: reportCategory,
                reportingUserType: "Transporter", // Específico para transportadores
                reportedUserType: "User", // Siempre reportando a un usuario
                reportedShipment: idShipment as string
            };
            
            const response = await createReport(reportData);
            
            if (response.report) {
                setAlertMessage('Reporte enviado con éxito');
                setAlertType('success');
                setShowAlert(true);
                setIsReportModalOpen(false);
                // Reset form
                setReportTitle('');
                setReportDescription('');
                setReportCategory('');
            }
        } catch (error) {
            setAlertMessage('Error al enviar el reporte');
            setAlertType('error');
            setShowAlert(true);
        } finally {
            stopLoading();
        }
    };

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
                            { label: t('user.shipments.details.cost'), content: `$ ${shipment.cost}` },
                        ]}
                    />
    
                    {/* Now we can access the user property properly */}
                    {shipment.client && (
                        <BasicTextCardProps
                            title="Cliente"
                            subtitles={[
                                { label: "Nombre", content: `${shipment.client.name || ''} ${shipment.client.lastName || ''}` },
                                { label: "Email", content: shipment.client.email || '' },
                                { label: "Teléfono", content: shipment.client.phone || "No disponible" },
                            ]}
                        />
                    )}

                    {/* Botón de aceptar envío - Solo para envíos activados */}
                    {shipment.status === 'activated' && (
                        <div className="mt-4">
                            <CustomButton
                                text="Aceptar Envío"
                                variant="primary"
                                onClick={acceptShipmentClick}
                            />
                        </div>
                    )}

                    {/* Botón de reporte - Solo para envíos aceptados o en progreso */}
                    {['accepted', 'inTransit'].includes(shipment.status) && (
                        <div className="mt-4">
                            <CustomButton
                                text={t('user.shipments.details.reportProblem')}
                                variant="secondary"
                                onClick={() => setIsReportModalOpen(true)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Report Modal */}
            <CustomModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                title={t('user.shipments.details.reportShipment')}
            >
                <div className="space-y-4">
                    <div>
                        <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-800">
                            {t('user.shipments.details.reportTitle')}
                        </label>
                        <input
                            type="text"
                            id="reportTitle"
                            value={reportTitle}
                            onChange={(e) => setReportTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-primary-400 focus:ring-primary-400 p-2 text-gray-800"
                            placeholder={t('user.shipments.details.reportTitlePlaceholder')}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="reportCategory" className="block text-sm font-medium text-gray-800">
                            {t('user.shipments.details.reportCategory')}
                        </label>
                        <select
                            id="reportCategory"
                            value={reportCategory}
                            onChange={(e) => setReportCategory(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-primary-400 focus:ring-primary-400 p-2 text-gray-800"
                        >
                            <option value="">{t('user.shipments.details.selectCategory')}</option>
                            <option value="payment">{t('user.shipments.details.categoryPayment')}</option>
                            <option value="delivery">{t('user.shipments.details.categoryDelivery')}</option>
                            <option value="damage">{t('user.shipments.details.categoryDamage')}</option>
                            <option value="communication">{t('user.shipments.details.categoryCommunication')}</option>
                            <option value="other">{t('user.shipments.details.categoryOther')}</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="reportDescription" className="block text-sm font-medium text-gray-800">
                            {t('user.shipments.details.reportDescription')}
                        </label>
                        <textarea
                            id="reportDescription"
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-primary-400 focus:ring-primary-400 p-2 text-gray-800"
                            placeholder={t('user.shipments.details.reportDescriptionPlaceholder')}
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                        <CustomButton
                            text={t('user.shipments.details.cancelButton')}
                            variant="secondary"
                            onClick={() => setIsReportModalOpen(false)}
                        />
                        <CustomButton
                            text={t('user.shipments.details.submitReport')}
                            variant="primary"
                            onClick={handleSubmitReport}
                        />
                    </div>
                </div>
            </CustomModal>
            
            {/* Alert component */}
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}

            {/* Back Button */}
            <div className="mt-6">
                <CustomButton
                    text="Volver"
                    variant="secondary"
                    onClick={() => router.back()}
                />
            </div>
        </div>
    );
}
