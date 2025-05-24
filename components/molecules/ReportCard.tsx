import React from 'react';
import { Report } from '@/Interfaces/report/ReportInterface';
import { format } from 'date-fns';
import { es, enUS, fr } from 'date-fns/locale';

interface ReportCardProps {
  report: Report;
  t: any;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, t }) => {
  // Get the appropriate locale for date formatting based on the page language
  const getDateLocale = () => {
    // Try to detect the current locale from the HTML document
    const htmlLang = typeof document !== 'undefined' ? document.documentElement.lang : 'en';
    
    switch (htmlLang.toLowerCase()) {
      case 'es': return es;
      case 'fr': return fr;
      default: return enUS;
    }
  };
  
  // Format date with proper localization
  const formattedDate = format(new Date(report.createdAt), 'PPP', { locale: getDateLocale() });
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get category translation key
  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'retraso_servicio': return 'user.reports.categories.delayService';
      case 'daño_envio': return 'user.reports.categories.packageDamage';
      case 'problema_direccion': return 'user.reports.categories.addressProblem';
      case 'payment': return 'user.reports.categories.payment';
      case 'delivery': return 'user.reports.categories.delivery';
      case 'damage': return 'user.reports.categories.damage';
      case 'communication': return 'user.reports.categories.communication';
      case 'other': return 'user.reports.categories.other';
      default: return 'user.reports.categories.other';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{report.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
          {t(`user.reports.status.${report.status}`)}
        </span>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        <p className="mb-1">{t('user.reports.category')}: {t(getCategoryTranslation(report.category))}</p>
        <p className="mb-3">{t('user.reports.date')}: {formattedDate}</p>
      </div>
      
      <div className="mt-2">
        <p className="text-gray-800 mb-3">{report.description}</p>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="font-medium text-gray-700 mb-1">{t('user.reports.relatedShipment')}</h4>
        <p className="text-sm text-gray-600">{report.reportedShipment.title}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 mt-1">
          <p>{t('user.reports.pickup')}: {report.reportedShipment.pickupAddress}</p>
          <p>{t('user.reports.delivery')}: {report.reportedShipment.deliveryAddress}</p>
        </div>
      </div>
      
      {report.solutionExplanation && (
        <div className="mt-4 border-t border-gray-200 pt-3">
          <h4 className="font-medium text-gray-700 mb-1">{t('user.reports.solution')}</h4>
          <p className="text-sm text-gray-600">{report.solutionExplanation}</p>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
