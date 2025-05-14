'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomAlert from "@/components/atoms/CustomAlert";

export default function DropdownUser() {
    const router = useRouter();
    const t = useTranslations();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('success');

    const createOption = () => {
        router.push("/admin/users/create");
    };

    const handleAlert = (message: string) => {
        setAlertMessage(message);
        setAlertType('success');
        setShowAlert(true);
    };

    return (
        <>
            <CustomDropdown
                buttonText={t('admin.users.dropdown.menu')}
                options={[
                    {
                        text: t('admin.users.dropdown.createUser'),
                        onClick: createOption,
                    },
                    {
                        text: t('admin.users.dropdown.sortByRole'),
                        onClick: () => handleAlert("Opción 2 seleccionada"),
                    },
                    {
                        text: t('admin.users.dropdown.sortByEmail'),
                        onClick: () => handleAlert("Opción 3 seleccionada"),
                    },
                ]}
                variant="primary"
            />

            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    duration={3000}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </>
    );
}