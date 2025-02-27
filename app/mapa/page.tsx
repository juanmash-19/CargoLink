import { Metadata } from "next";
import ScreenMapa from "@/modules/mapa/ScreenMapa";

export const metadata: Metadata = {
    title: "mapa",
    description: "Estado de tu envio",
    alternates: {
        canonical: 'https://mydomain.com/mapa'
    }
}

export default function Mapa(){
    return <ScreenMapa />
}