import { Metadata } from "next"
import Screenadmin from "@/modules/admin/ScreenAdmin"

export const metadata: Metadata = {
    title: "Admin",
    description: "Panel de administración para gestionar el sitio",
    alternates: {
        canonical: 'https://mydomain.com/admin'
    }
}
export default function adminPage() {
    return <Screenadmin />
}