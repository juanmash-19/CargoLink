import { Metadata } from "next"
import ScreenTermsConditions from "@/modules/info/ScreenTermsConditions"

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: "Terms and conditions of the service",
    alternates: {
        canonical: 'https://mydomain.com/terms-conditions'
    }
}

export default function TermsConditionsPage() {
    return <ScreenTermsConditions />
}