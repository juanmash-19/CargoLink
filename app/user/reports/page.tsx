import { Metadata } from "next"
import ScreenUserReports from "@/modules/user/reports/ScreenUserReports"

export const metadata: Metadata = {
  title: "Create shipment",
  description: "Here you can create a new shipment",
  alternates: {
    canonical: 'https://mydomain.com/user/shipments/create'
  }
}

export default function ProfilePage() {

  return <ScreenUserReports />

}