import { Metadata } from "next";
import ScreenMeAdminShipments from "@/modules/admin/shipments/me/ScreenMeAdminShipments";

export const metadata: Metadata = {
    title: "Shipment Manager show",
    description: "Here you can see the shipment",
    alternates: {
        canonical: 'https://mydomain.com/admin/users/edit/'
    }
}
export default function adminPage() {
    return <ScreenMeAdminShipments />
}