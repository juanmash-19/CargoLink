import { Metadata } from "next"
import ScreenAdminShipments from "@/modules/admin/shipments/ScreenAdminShipment"

export const metadata: Metadata = {
    title: "Admin",
    description: "Panel de administración para gestionar el sitio",
    alternates: {
        canonical: 'https://mydomain.com/admin/shipments'
    }
}
export default function adminPage() {
    return <ScreenAdminShipments />
}