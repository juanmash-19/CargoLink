'use client'
import React, { useEffect, useState } from 'react';
import { Report, ReportWrapper } from '@/Interfaces/report/ReportInterface';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { useTranslations } from 'next-intl';
import CustomAlert from "@/components/atoms/CustomAlert";
import ReportCard from '@/components/molecules/ReportCard';
import CustomModal from "@/components/molecules/CustomModal";
import CustomButton from "@/components/atoms/CustomButton";
import { getAdminReports, resolveReport } from '@/libs/ServiceAdmin/api-admin';

export default function ScreenAdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const { startLoading, stopLoading } = useLoadingStore();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');
  const t = useTranslations();
  
  // States for resolution modal
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [resolutionStatus, setResolutionStatus] = useState<'resolved' | 'closed'>('resolved');
  const [resolutionExplanation, setResolutionExplanation] = useState('');

  // Fetch all reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        startLoading();
        const response = await getAdminReports();
        // Transform the response to a flat array of reports with proper typing
        const fetchedReports = response.reports.map((item: ReportWrapper) => item.report);
        setReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setAlertMessage(error instanceof Error ? error.message : 'Error al cargar los reportes');
        setAlertType('error');
        setShowAlert(true);
      } finally {
        stopLoading();
      }
    };

    fetchReports();
  }, [startLoading, stopLoading]);

  // Open resolution modal
  const handleOpenResolutionModal = (reportId: string) => {
    setSelectedReportId(reportId);
    setResolutionStatus('resolved');
    setResolutionExplanation('');
    setIsResolutionModalOpen(true);
  };

  // Submit resolution
  const handleSubmitResolution = async () => {
    if (!selectedReportId || !resolutionExplanation) {
      setAlertMessage('Por favor complete todos los campos');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    try {
      startLoading();
      
      const resolutionData = {
        status: resolutionStatus,
        solutionExplanation: resolutionExplanation
      };
      
      const response = await resolveReport(selectedReportId, resolutionData);
      
      if (response.report) {
        setAlertMessage(`Reporte ${resolutionStatus === 'resolved' ? 'resuelto' : 'cerrado'} exitosamente`);
        setAlertType('success');
        setShowAlert(true);
        setIsResolutionModalOpen(false);
        
        // Update the reports list
        setReports(prevReports => 
          prevReports.map(report => 
            report._id === selectedReportId 
              ? {...report, status: resolutionStatus, solutionExplanation: resolutionExplanation} 
              : report
          )
        );
      }
    } catch (error) {
      setAlertMessage('Error al actualizar el reporte');
      setAlertType('error');
      setShowAlert(true);
    } finally {
      stopLoading();
    }
  };

  // Group reports by status
  const pendingReports = reports.filter(report => report.status === 'pending');
  const resolvedReports = reports.filter(report => report.status === 'resolved');
  const closedReports = reports.filter(report => report.status === 'closed');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Reportes</h1>
      
      {reports.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600 mb-4">No hay reportes disponibles</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Pending Reports Section */}
          {pendingReports.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></span>
                {t('user.reports.pendingReports')} ({pendingReports.length})
              </h2>
              <div className="space-y-4">
                {pendingReports.map(report => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow">
                    <ReportCard report={report} t={t} />
                    <div className="mt-4 flex justify-end space-x-2">
                      <CustomButton
                        text="Marcar como Resuelto"
                        variant="primary"
                        onClick={() => handleOpenResolutionModal(report._id)}
                      />
                      <CustomButton
                        text="Cerrar Reporte"
                        variant="secondary"
                        onClick={() => {
                          setResolutionStatus('closed');
                          handleOpenResolutionModal(report._id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolved Reports Section */}
          {resolvedReports.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                {t('user.reports.resolvedReports')} ({resolvedReports.length})
              </h2>
              <div className="space-y-4">
                {resolvedReports.map(report => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow">
                    <ReportCard report={report} t={t} />
                    {report.solutionExplanation && (
                      <div className="mt-4 border-t pt-3">
                        <h3 className="font-medium text-gray-700">Solución:</h3>
                        <p className="text-gray-600">{report.solutionExplanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Closed Reports Section */}
          {closedReports.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
                {t('user.reports.closedReports')} ({closedReports.length})
              </h2>
              <div className="space-y-4">
                {closedReports.map(report => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow">
                    <ReportCard report={report} t={t} />
                    {report.solutionExplanation && (
                      <div className="mt-4 border-t pt-3">
                        <h3 className="font-medium text-gray-700">Justificación del cierre:</h3>
                        <p className="text-gray-600">{report.solutionExplanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Resolution Modal */}
      <CustomModal
        isOpen={isResolutionModalOpen}
        onClose={() => setIsResolutionModalOpen(false)}
        title={resolutionStatus === 'resolved' ? "Resolver Reporte" : "Cerrar Reporte"}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="resolutionStatus" className="block text-sm font-medium text-gray-800">
              Estado
            </label>
            <select
              id="resolutionStatus"
              value={resolutionStatus}
              onChange={(e) => setResolutionStatus(e.target.value as 'resolved' | 'closed')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-primary-400 focus:ring-primary-400 p-2 text-gray-800"
            >
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="resolutionExplanation" className="block text-sm font-medium text-gray-800">
              {resolutionStatus === 'resolved' ? "Explicación de la solución" : "Justificación del cierre"}
            </label>
            <textarea
              id="resolutionExplanation"
              value={resolutionExplanation}
              onChange={(e) => setResolutionExplanation(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-primary-400 focus:ring-primary-400 p-2 text-gray-800"
              placeholder={resolutionStatus === 'resolved' 
                ? "Describe cómo se resolvió el problema..." 
                : "Explica por qué se cierra el reporte sin resolver..."
              }
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <CustomButton
              text="Cancelar"
              variant="secondary"
              onClick={() => setIsResolutionModalOpen(false)}
            />
            <CustomButton
              text={resolutionStatus === 'resolved' ? "Resolver" : "Cerrar Reporte"}
              variant="primary"
              onClick={handleSubmitResolution}
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
    </div>
  );
}
