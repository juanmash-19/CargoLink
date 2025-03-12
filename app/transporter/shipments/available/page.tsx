import { Metadata } from "next"
import ScreenShipmentAvailable from "@/modules/transporter/shipment/ScreenAvailableShip"

export const metadata: Metadata = {
  title: "Me shipment",
  description: "Here you can view a your shipment",
  alternates: {
    canonical: 'https://mydomain.com/transporter/shipments/available/'
  }
}

export default function ProfilePage() {

  return <ScreenShipmentAvailable />

}