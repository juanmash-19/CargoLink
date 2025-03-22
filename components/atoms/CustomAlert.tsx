import React, { useEffect, useState } from 'react';

interface ButtonProps {
  text: string;
  color: string;
  action: () => void;
}

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error' | 'options';
  buttons?: ButtonProps[];
  duration?: number;
  onClose?: () => void;
}

export default function CustomAlert({
  message,
  type,
  buttons = [],
  duration = 3000,
  onClose,
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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          {type === 'options' &&
            buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`px-4 py-2 rounded text-white ${button.color}`}
              >
                {button.text}
              </button>
            ))}
          {(type === 'success' || type === 'error') && (
            <button
              onClick={() => {
                setIsVisible(false);
                if (onClose) onClose();
              }}
              className="px-4 py-2 rounded bg-gray-500 text-white"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};