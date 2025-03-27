import { Metadata } from "next"
import ScreenaAdminUser from "@/modules/admin/users/ScreenAdminUser"

export const metadata: Metadata = {
    title: "User Manager",
    description: "Here you can manage the site users",
    alternates: {
        canonical: 'https://mydomain.com/admin/users'
    }
}
export default function adminPage() {
    return <ScreenaAdminUser />
}