import { Metadata } from "next"
import ScreenShipmentMe from "@/modules/user/shipments/create/ScreenMeShipment"
import { getShipment } from '@/libs/ServiceShipment/api-shipment' // Asegúrate de importar correctamente
import { ShipmentDAO } from '@/Interfaces/shipment/ShipmentInterface' // Asegúrate de tener esta interfaz
import  notFound  from '@/app/not-found'

interface ShipmentPageProps {
  params: Promise<{ shipment: string }>
}

// Si necesitas generar rutas estáticas
export async function generateStaticParams() {
  // Aquí podrías generar IDs estáticos si los necesitas
  // Por ahora lo dejamos vacío ya que los shipments son dinámicos
  return []
}

export async function generateMetadata({ params }: ShipmentPageProps): Promise<Metadata> {
  try {
    const idShipment = (await params).shipment
    const response = await getShipment(idShipment)
    const shipment = response.shipment

    return {
      title: `Envío #${shipment._id}`,
      description: `Detalles del envío con origen: ${shipment._id} y destino: ${shipment.deliveryAddress}`,
      alternates: {
        canonical: `https://mydomain.com/user/shipments/me/${idShipment}`
      }
    }
  } catch {
    return {
      title: 'Envío no encontrado',
      description: 'No se pudo encontrar la información del envío',
    }
  }
}

const getShipmentData = async (id: string): Promise<ShipmentDAO> => {
  try {
    const response = await getShipment(id)
    if (!response.shipment) {
      notFound()
    }
    return response
  } catch (error) {
    notFound()
    throw error
  }
}

export default async function ShipmentPage({ params }: ShipmentPageProps) {
  const idShipment = (await params).shipment
  await getShipmentData(idShipment) // Verificamos que el envío existe

  return <ScreenShipmentMe />
}