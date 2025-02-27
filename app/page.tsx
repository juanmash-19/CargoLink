import { Metadata } from "next";
import ScreemHomePage from "@/modules/home/ScreenHome";

export const metadata: Metadata = {
    title: "Home",
    description: "Bienvenido a Cargo Link",
    alternates: {
        canonical: 'https://mydomain.com/home'
    }
}

export default function Home(){
    return <ScreemHomePage />
}
