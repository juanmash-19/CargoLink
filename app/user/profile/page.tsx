import { Metadata } from "next"
import ScreenUser from "@/modules/user/ScreenUser"

export const metadata: Metadata = {
  title: "Profile",
  description: "Here you can view and edit your personal information",
  alternates: {
    canonical: 'https://mydomain.com/user/profile'
  }
}

export default function ProfilePage() {

  return <ScreenUser />

}
