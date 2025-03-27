import { Metadata } from "next";
import ScreenAdminCreateUser from "@/modules/admin/users/create/ScreenAdminCreateUser";

export const metadata: Metadata = {
    title: "User Manager Create",
    description: "Here you can create users",
    alternates: {
        canonical: 'https://mydomain.com/admin/users/create/'
    }
}
export default function adminPage() {
    return <ScreenAdminCreateUser />
}