import React from "react";
import Image from "next/image";
import { MapPin, Navigation, Weight, Ruler } from 'lucide-react';
import { useTranslations } from "next-intl";
import CustomButton from '@/components/atoms/CustomButton';

interface DeliveryShipmentCardProps {
  title: string;
  imageUrl?: string;
  distance: number;
  totalCharge: number;
  totalDistance: number;
  profit: number;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
  weight: number;
  status: string;
  onOpenMap: () => void;
  onViewDetails: () => void;
  onConfirmDelivery?: () => void;
  onConfirmTransit?: () => void;
}

const DeliveryShipmentCard: React.FC<DeliveryShipmentCardProps> = ({
  title,
  imageUrl,
  distance,
  totalCharge,
  totalDistance,
  profit,
  dimensions,
  weight,
  status,
  onOpenMap,
  onViewDetails,
  onConfirmDelivery,
  onConfirmTransit
}) => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Card Header */}
      <div className="p-4 bg-primary-100 text-white">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image Section */}
          <div className="w-full md:w-1/4 relative h-48 md:h-auto">
            <Image 
              src={imageUrl || '/shipment-placeholder.jpg'} 
              alt={t('shipmentCard.imageAlt')}
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/4 space-y-4">
            {/* First Row - Main Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.distance')}</span>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary-100 mr-1" />
                  <span className="font-medium text-gray-600">{distance} km</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.totalCharge')}</span>
                <span className="font-bold text-lg text-primary-100">
                  ${totalCharge.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.status')}</span>
                <div className="flex items-center">
                  <span className={`font-medium ${
                    status === 'accepted' ? 'text-blue-600' : 
                    status === 'in_transit' ? 'text-orange-500' : 'text-gray-600'
                  }`}>
                    {status === 'accepted' 
                      ? t('admin.shipments.edit.statuses.accepted') 
                      : status === 'in_transit' 
                        ? t('admin.shipments.edit.statuses.inTransit') 
                        : status}
                  </span>
                </div>
              </div>
            </div>

            {/* Second Row - Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.profit')}</span>
                <span className="font-medium text-green-600">
                  ${profit.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.dimensions')}</span>
                <div className="flex items-center">
                  <Ruler className="w-5 h-5 text-primary-100 mr-1" />
                  <span className="font-medium text-gray-600">
                    {dimensions.width}×{dimensions.height}×{dimensions.length} cm
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{t('shipmentCard.weight')}</span>
                <div className="flex items-center">
                  <Weight className="w-5 h-5 text-primary-100 mr-1" />
                  <span className="font-medium  text-gray-600">{weight} kg</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-end">
              <CustomButton 
                text={t('shipmentCard.openMapButton')}
                variant="danger"
                type="button"
                onClick={onOpenMap}
              />
              <CustomButton 
                text={t('shipmentCard.viewDetailsButton')}
                variant="primary"
                type="button"
                onClick={onViewDetails}
              />
              {status === 'accepted' && onConfirmTransit && (
                <CustomButton 
                  text={t('shipmentCard.confirmTransitButton')}
                  variant="secondary"
                  type="button"
                  onClick={onConfirmTransit}
                />
              )}
              {status === 'in_transit' && onConfirmDelivery && (
                <CustomButton 
                  text={t('shipmentCard.confirmDeliveryButton')}
                  variant="green"
                  type="button"
                  onClick={onConfirmDelivery}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryShipmentCard;
