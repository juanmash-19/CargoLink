import { Metadata } from "next"
import ScreenAdminReports from "@/modules/admin/reports/ScreenAdminReports"

export const metadata: Metadata = {
  title: "Create shipment",
  description: "Here you can create a new shipment",
  alternates: {
    canonical: 'https://mydomain.com/user/shipments/create'
  }
}

export default function ProfilePage() {

  return <ScreenAdminReports />

}