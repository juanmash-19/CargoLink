import { Metadata } from "next"
import ScreenPrivacyPolicy from "@/modules/info/ScreenPrivacyPolicy"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy of the service",
    alternates: {
        canonical: 'https://mydomain.com/privacy-policy'
    }
}

export default function PrivacyPolicyPage() {
    return <ScreenPrivacyPolicy />
}