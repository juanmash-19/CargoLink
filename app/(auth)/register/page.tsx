import { Metadata } from "next"
import ScreenRegister from "@/modules/auth/ScreenRegister"

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account to access",
  alternates: {
    canonical: 'https://mydomain.com/register'
  }
}

export default function RegisterPage() {

  return <ScreenRegister />

}