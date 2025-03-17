import { Metadata } from "next"
import ScreenRepartidor from "@/modules/admin/repartidor/ScreenRepartidor"

export const metadata: Metadata = {
    title: "Repartidor",
    description: "Panel de administración para gestionar los repartidores",
    alternates: {
        canonical: 'https://mydomain.com/admin/repartidor'
    }
}

export default function Page() {
    return <ScreenRepartidor />;
  }