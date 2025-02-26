import { Metadata } from "next"
import ScreenLogin from "@/modules/auth/login/ScreenLogin"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access",
  alternates: {
    canonical: 'https://mydomain.com/login'
  }
}

export default function LoginPage() {

  return <ScreenLogin />

}
