import React from "react";
import { Truck, MapPin, PackageCheck, Star, UserCog } from "lucide-react";

export default function ClientServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Servicios para Clientes</h1>

      <p className="text-lg text-gray-700 text-center mb-12">
        En <strong>CargoLink</strong>, te ofrecemos todas las herramientas que necesitas para gestionar tus envíos de forma rápida, segura y sin complicaciones. Nuestra plataforma está pensada para que tengas el control total de tus entregas desde un solo lugar.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ServiceCard
          icon={<PackageCheck className="w-8 h-8 text-blue-600" />}
          title="Solicita envíos en segundos"
          description="Completa un formulario fácil e intuitivo para generar tu solicitud de envío en pocos pasos."
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-green-600" />}
          title="Rastrea tus paquetes"
          description="Visualiza en tiempo real el estado y ubicación de tus envíos desde tu panel personal."
        />
        <ServiceCard
          icon={<Truck className="w-8 h-8 text-orange-500" />}
          title="Elige tu transportista"
          description="Compara repartidores disponibles y selecciona el que mejor se adapte a tus necesidades."
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-yellow-500" />}
          title="Califica tu experiencia"
          description="Deja una reseña sobre el repartidor y mejora la calidad del servicio para toda la comunidad."
        />
        <ServiceCard
          icon={<UserCog className="w-8 h-8 text-purple-600" />}
          title="Administra tu perfil"
          description="Podrás editar tu información personal, cambiar contraseña y, próximamente, gestionar todo desde tu configuración."
        />
        <ServiceCard
          icon={<PackageCheck className="w-8 h-8 text-red-600" />}
          title="Historial de envíos"
          description="Consulta todos los envíos que has realizado, filtrando por estado, fecha o repartidor."
        />
        <ServiceCard
          icon={<MapPin className="w-8 h-8 text-teal-600" />}
          title="Ubicaciones inteligentes"
          description="Visualiza el origen y destino de tus envíos en el mapa, junto con tu ubicación actual."
        />
        <ServiceCard
          icon={<Star className="w-8 h-8 text-indigo-500" />}
          title="Atención personalizada"
          description="Recibe soporte y seguimiento desde tu cuenta si surge cualquier duda o inconveniente."
        />
      </section>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-md text-gray-800 text-center">
        <p className="text-xl font-medium">
          Todo esto desde una plataforma <strong>fácil de usar, segura y adaptada a tu día a día</strong>. ¡Empieza hoy con CargoLink!
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
