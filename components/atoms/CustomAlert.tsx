import React, { useEffect, useState } from 'react';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error' | 'options';
  duration?: number;
  onClose?: () => void;
  children?: React.ReactNode;  // <- Nuevo prop para children
}

export default function CustomAlert({
  message,
  type,
  duration = 5000,
  onClose,
  children,
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === 'success' || type === 'error') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [type, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`p-6 rounded-lg shadow-lg ${
          type === 'success' ? 'bg-green-500 text-white' : ''
        } ${
          type === 'error' ? 'bg-red-500 text-white' : ''
        } ${
          type === 'options' ? 'bg-white text-black' : ''
        }`}
      >
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          {/* Mostramos los children si existen */}
          {children}
          
          {/* Botón de cerrar para tipos success/error */}
          {(type === 'error' || type === 'success') && !children && (
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="px-4 py-2 rounded bg-gray-800 text-white"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};