import { Metadata } from "next";
import ScreenTransportador from "@/modules/transporter/ScreenTransporter";

export const metadata: Metadata = {
  title: "Transportador",
  description: "Panel del transportador para ver y gestionar sus fletes",
  alternates: {
    canonical: "https://mydomain.com/transportador"
  }
};

export default function TransportadorPage() {
  return <ScreenTransportador />;
}
