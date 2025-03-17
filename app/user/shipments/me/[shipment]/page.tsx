import { Metadata } from "next"
import ScreenShipmentMe from "@/modules/user/shipments/create/ScreenMeShipment"
import { getShipment } from '@/libs/ServiceShipment/api-shipment' 
import { ShipmentDAO } from '@/Interfaces/shipment/ShipmentInterface' 
import { notFound } from "next/navigation"
import { cookies } from "next/headers"

interface ShipmentPageProps {
  params: Promise<{ shipment: string }>
}

export async function generateStaticParams() {
  
  const staticShipments = Array.from({ length: 30 }).map((_, i) => `SHIP${i + 1}`)

  return staticShipments.map(id => ({
    shipment: id 
  }))
}

export async function generateMetadata({ params }: ShipmentPageProps): Promise<Metadata> {
  try {
    const token = (await cookies()).get('token')?.value;
    const idShipment = (await params).shipment
    const response = await getShipment(idShipment, token)
    const shipment = response.shipment

    return {
      title: `Envío #${shipment._id}`,
      description: `Detalles del envío con origen: ${shipment.pickupAddress} y destino: ${shipment.deliveryAddress}`,
      alternates: {
        canonical: `https://mydomain.com/user/shipments/me/${idShipment}`
      } 
    }
  } catch (err) {
    console.log("Entro al catch", {err})
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
  }
}

export default async function ShipmentPage({ params }: ShipmentPageProps) {
  const idShipment = (await params).shipment
  // await getShipmentData(idShipment) // Verificamos que el envío existe

  return <ScreenShipmentMe />
}