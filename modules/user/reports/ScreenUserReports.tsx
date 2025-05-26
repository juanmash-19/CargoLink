'use client'
import React, { useEffect, useState } from 'react';
import { getUserReports } from '@/libs/ServiceReport/api-report';
import { Report } from '@/Interfaces/report/ReportInterface';
import { useLoadingStore } from '@/store/LoadingSpinner';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import CustomAlert from "@/components/atoms/CustomAlert";
import ReportCard from '@/components/molecules/ReportCard';

export default function ScreenUserReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const { startLoading, stopLoading } = useLoadingStore();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('error');
  const router = useRouter();
  const t = useTranslations();
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        startLoading();
        const response = await getUserReports();
        // The response now includes detailed information including reportingUser, reportedUser, and reportedShipment
        // Directly map to get all reports with their nested information
        const fetchedReports = response.reports.map(item => item.report);
        setReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setAlertMessage(error instanceof Error ? error.message : t('user.reports.errorMessage'));
        setAlertType('error');
        setShowAlert(true);
      } finally {
        stopLoading();
      }
    };

    fetchReports();
  }, [startLoading, stopLoading]);

  // Group reports by status
  const pendingReports = reports.filter(report => report.status === 'pending');
  const resolvedReports = reports.filter(report => report.status === 'resolved');
  const closedReports = reports.filter(report => report.status === 'closed');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('user.reports.title')}</h1>
      
      {reports.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600 mb-4">{t('user.reports.noReports')}</p>
          <button 
            onClick={() => router.push('/user/shipments/me')}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            {t('user.reports.viewShipments')}
          </button>
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
                  <ReportCard key={report._id} report={report} t={t} />
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
                  <ReportCard key={report._id} report={report} t={t} />
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
                  <ReportCard key={report._id} report={report} t={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
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
