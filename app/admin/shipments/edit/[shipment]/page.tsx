import { Metadata } from "next";
import ScreenAdminEditShipment from "@/modules/admin/shipments/edit/ScreenAdminEditShipments";

export const metadata: Metadata = {
    title: "User Manager Edit",
    description: "Here you can edit the shipments",
    alternates: {
        canonical: 'https://mydomain.com/admin/users/edit/'
    }
}
export default function adminPage() {
    return <ScreenAdminEditShipment />
}