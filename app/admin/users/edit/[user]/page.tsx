import { Metadata } from "next";
import ScreenAdminEditUser from "@/modules/admin/users/edit/ScreenAdminEditUser";

export const metadata: Metadata = {
    title: "User Manager Edit",
    description: "Here you can edit the users",
    alternates: {
        canonical: 'https://mydomain.com/admin/users/edit/'
    }
}
export default function adminPage() {
    return <ScreenAdminEditUser />
}