// app/services/page.tsx

import React from "react";

export default function ServicesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">¿Qué es CargoLink?</h1>
      
      <p className="text-lg text-gray-700 mb-8 text-justify">
        <strong>CargoLink</strong> es una plataforma digital pensada para facilitar y optimizar la gestión de envíos entre clientes y repartidores. Nuestro objetivo es ofrecer una experiencia rápida, confiable y transparente para todas las partes involucradas en un proceso logístico. Hemos desarrollado un sistema funcional con módulos clave, y seguimos mejorándolo para convertirlo en una solución integral para cualquier negocio que requiera transporte de mercancías.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Funcionalidades ya disponibles:</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li><strong>Gestión de usuarios:</strong> Registro y administración de cuentas tanto para clientes como repartidores.</li>
            <li><strong>Autenticación segura:</strong> Sistema de inicio de sesión confiable y control de acceso por roles.</li>
            <li><strong>Reseñas bilaterales:</strong> Evaluaciones entre clientes y repartidores luego de cada envío.</li>
            <li><strong>Panel de administrador:</strong> Acceso centralizado con estadísticas y control general (estadísticas simuladas por ahora).</li>
            <li><strong>Panel de repartidor:</strong> Visualización de envíos asignados y herramientas básicas de gestión.</li>
            <li><strong>Lista de envíos disponibles:</strong> Visualización en tiempo real según su estado.</li>
            <li><strong>Vista detallada de cada envío:</strong> Consulta de origen, destino y datos clave para confirmar disponibilidad.</li>
            <li><strong>Interfaz responsive:</strong> Adaptado a móviles, tablets y escritorio.</li>
            <li><strong>Conexión con Cloudinary:</strong> Gestión de imágenes optimizada y rápida.</li>
          </ul>
        </div>
        <div>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li><strong>Configuración de perfil:</strong> Cambio de contraseña, nombre, teléfono y opción para eliminar la cuenta.</li>
            <li><strong>Panel de gestión de usuarios:</strong> Para que administradores puedan crear, editar y eliminar usuarios fácilmente.</li>
            <li><strong>Panel de gestión de envíos:</strong> Control total sobre todos los envíos en la plataforma.</li>
            <li><strong>Panel “Mis envíos”:</strong> Para que tanto clientes como repartidores vean todos sus envíos (activos, inactivos, con filtros).</li>
            <li><strong>Homepage personalizada:</strong> Para mostrar a cada usuario sus estadísticas y actividad reciente tras iniciar sesión.</li>
            <li><strong>Homepage del repartidor:</strong> Con visualización de saldo, estadísticas y envíos activos.</li>
            <li><strong>Integración con mapas:</strong> Para ver ubicaciones actuales, origen y destino de envíos.</li>
            <li><strong>Páginas informativas:</strong> Sobre roles, beneficios y cómo aprovechar al máximo la plataforma (cliente/repartidor).</li>
            <li><strong>Redirecciones inteligentes:</strong> Para asegurar que cada usuario acceda a lo que le corresponde según su rol.</li>
            <li><strong>Gráficas dinámicas:</strong> Estadísticas claras y visuales en los paneles.</li>
            <li><strong>Panel de perfil visual:</strong> Donde se pueda ver claramente nombre y correo electrónico del usuario.</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded">
          <p className="text-gray-800">
            En <strong>CargoLink</strong> trabajamos día a día para convertirnos en la plataforma de confianza para la gestión de envíos. Nuestro enfoque es brindar una solución tecnológica útil, fácil de usar y lista para adaptarse a distintos modelos de negocio.
          </p>
        </div>
      </section>
    </main>
  );
}
