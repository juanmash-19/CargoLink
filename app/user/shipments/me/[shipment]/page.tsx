import { Metadata } from "next"
import ScreenShipmentMe from "@/modules/user/shipments/create/ScreenMeShipment"

export const metadata: Metadata = {
  title: "Me shipment",
  description: "Here you can view a your shipment",
  alternates: {
    canonical: 'https://mydomain.com/user/shipments/me/'
  }
}

export default function ProfilePage() {

  return <ScreenShipmentMe />

}