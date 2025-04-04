import { Metadata } from "next"
import UserShipmentsPage from "@/modules/user/shipments/me/ScreenShipmentsUser"

export const metadata: Metadata = {
  title: "Create shipment",
  description: "Here you can create a new shipment",
  alternates: {
    canonical: 'https://mydomain.com/user/shipments/create'
  }
}

export default function ProfilePage() {

  return <UserShipmentsPage />

}
 