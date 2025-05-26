import { Metadata } from "next"
import ScreenDetailsShimentTransport from "@/modules/transporter/shipment/ScreenDetailsShimentTransport"

export const metadata: Metadata = {
  title: "Create shipment",
  description: "Here you can create a new shipment",
  alternates: {
    canonical: 'https://mydomain.com/user/shipments/create'
  }
}

export default function ProfilePage() {

  return <ScreenDetailsShimentTransport />

}