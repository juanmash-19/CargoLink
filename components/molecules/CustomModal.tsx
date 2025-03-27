// components/atoms/CustomModal.tsx
"use client"; // Asegúrate de que este componente sea un Client Component

import React from "react";

interface CustomModalProps {
  isOpen: boolean; // Estado de visibilidad del modal
  onClose: () => void; // Función para cerrar el modal
  title: string; // Título del modal
  children: React.ReactNode; // Contenido del modal
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) {
  if (!isOpen) return null; // No renderizar el modal si no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}