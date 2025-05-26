import React from "react";
import {
  ClipboardCheck,
  Route,
  Wallet,
  BarChart3,
  MapPin,
  Star,
  Clock,
  Settings,
} from "lucide-react";

export default function TransporterServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Servicios para Transportadores
      </h1>

      <p className="text-lg text-gray-700 text-center mb-12">
        En <strong>CargoLink</strong>, brindamos a los transportadores todas las herramientas que necesitan para trabajar de forma eficiente, organizada y rentable. ¡Conecta con más clientes, gestiona tus rutas y haz crecer tu operación logística desde un solo lugar!
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ServiceCard
          icon={<ClipboardCheck className="w-8 h-8 text-blue-600" />}
          title="Acepta pedidos fácilmente"
          description="Visualiza los envíos disponibles y acepta los que se adapten mejor a tu ubicación, horario y capacidad."
        />
        <ServiceCard
          icon={<Route className="w-8 h-8 text-green-600" />}
          title="Optimiza tus rutas"
          description="Usa mapas interactivos para planificar tus trayectos y entregar más en menos tiempo."
        />
        <ServiceCard
          icon={<Wallet className="w-8 h-8 text-amber-500" />}
          title="Recibe pagos seguros"
          description="Recibe tus pagos de manera rápida y segura a través de nuestra plataforma integrada."
        />
        <ServiceCard
          icon={<BarChart3 className="w-8 h-8 text-purple-600" />}
          title="Consulta estadísticas"
          description="Revisa tus ingresos, número de entregas, rendimiento y más desde tu panel de control."
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-red-500" />}
          title="Ubicación en tiempo real"
          description="Sigue tu ruta actual y visualiza origen y destino de los paquetes en el mapa."
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-yellow-500" />}
          title="Recibe valoraciones"
          description="Gana reputación con cada entrega. Los clientes podrán dejarte reseñas que te ayudarán a conseguir más pedidos."
        />
        <ServiceCard
          icon={<Clock className="w-8 h-8 text-cyan-600" />}
          title="Flexibilidad total"
          description="Tú decides cuándo trabajar y qué envíos aceptar. Maneja tu tiempo de forma independiente."
        />
        <ServiceCard
          icon={<Settings className="w-8 h-8 text-indigo-500" />}
          title="Gestión de perfil"
          description="Configura tu perfil, consulta tus datos y prepárate para futuras herramientas como edición y eliminación de cuenta."
        />
      </section>

      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-md text-gray-800 text-center">
        <p className="text-xl font-medium">
          <strong>Maximiza tu productividad</strong> y obtén más ingresos con <strong>CargoLink</strong>, la plataforma pensada para profesionales del transporte. ¡Empieza hoy mismo!
        </p>
      </div>
    </main>
  );
}

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex items-start space-x-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
      <div>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
