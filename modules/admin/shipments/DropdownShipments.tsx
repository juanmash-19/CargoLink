'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DropdownShipment() {
    const router = useRouter();
    const t = useTranslations();

    const createOption = () => {
        router.push("/admin/users/create");
    };

    const handleOption2 = () => {
        alert("Opción 2 seleccionada");
    };

    const handleOption3 = () => {
        alert("Opción 3 seleccionada");
    };

    return (
        <>
            {/* Usa el Dropdown */}
            <CustomDropdown
                buttonText={t('admin.shipments.dropdown.menu')}
                options={[
                    {
                        text: t('admin.shipments.dropdown.createShipment'),
                        onClick: createOption,
                    },
                    {
                        text: t('admin.shipments.dropdown.sortByPrice'),
                        onClick: handleOption2,
                    },
                    {
                        text: t('admin.shipments.dropdown.sortByCreationDate'),
                        onClick: handleOption3,
                    },
                ]}
                variant="primary"
            />
        </>
    );
}