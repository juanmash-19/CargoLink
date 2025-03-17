import { Metadata } from "next"
import ScreenShipmentMe from "@/modules/user/shipments/create/ScreenMeShipment"
import { getShipment } from '@/libs/ServiceShipment/api-shipment' 
import { ShipmentDAO } from '@/Interfaces/shipment/ShipmentInterface' 
import  notFound  from '@/app/not-found'

interface ShipmentPageProps {
  params: Promise<{ shipment: string }>
}


export async function generateStaticParams() {

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

console.log('Hello world');

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
  await getShipmentData(idShipment) 

  return <ScreenShipmentMe />
}