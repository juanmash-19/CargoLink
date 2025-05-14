'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DropdownUser() {
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
                buttonText={t('admin.users.dropdown.menu')}
                options={[
                    {
                        text: t('admin.users.dropdown.createUser'),
                        onClick: createOption,
                    },
                    {
                        text: t('admin.users.dropdown.sortByRole'),
                        onClick: handleOption2,
                    },
                    {
                        text: t('admin.users.dropdown.sortByEmail'),
                        onClick: handleOption3,
                    },
                ]}
                variant="primary"
            />
        </>
    );
}