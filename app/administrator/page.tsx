import { Metadata } from "next"
import ScreenAdministrator from "@/modules/administrator/ScreenAdministrator"

export const metadata: Metadata = {
    title: "Administrador",
    description: "Panel de administración para gestionar el sitio",
    alternates: {
        canonical: 'https://mydomain.com/admin'
    }
}
export default function AdministratorPage() {
    return <ScreenAdministrator />
}