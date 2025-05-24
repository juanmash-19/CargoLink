import { Metadata } from "next";
import ScreenActivedShip from "@/modules/transporter/shipment/ScreenActivedShip";

export const metadata: Metadata = {
  title: "Actived shipments",
  description: "Here you can see your actived shipments",
  alternates: {
    canonical: 'https://mydomain.com/transporter/shipments/actives'
  }
};

export default function ActivedShipmentsPage() {
  return <ScreenActivedShip />
}