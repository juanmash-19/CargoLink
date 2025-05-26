'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomAlert from "@/components/atoms/CustomAlert";
import CustomButton from "@/components/atoms/CustomButton";

export default function DropdownShipment() {
    const router = useRouter();
    const t = useTranslations();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('success');    const createOption = () => {
        router.push("/admin/user/create");
    };const handleOrganization = (optionType: string) => {
        setAlertMessage(t('admin.shipments.dropdown.organizationMessage'));
        setAlertType('success');
        setShowAlert(true);
    };

    return (
        <>
            <CustomDropdown
                buttonText={t('admin.shipments.dropdown.menu')}
                options={[
                    {
                        text: t('admin.shipments.dropdown.createShipment'),
                        onClick: createOption,
                    },
                    {
                        text: t('admin.shipments.dropdown.sortByPrice'),
                        onClick: () => handleOrganization("precio"),
                    },
                    {
                        text: t('admin.shipments.dropdown.sortByCreationDate'),
                        onClick: () => handleOrganization("fecha de creación"),
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
                >
                    {alertType === 'options' && (
                        <div className="flex gap-2 justify-end">
                            <CustomButton
                                text="Cancelar"
                                variant="danger"
                                onClick={() => setShowAlert(false)}
                            />
                            <CustomButton
                                text="Confirmar"
                                variant="green"
                                onClick={() => console.log("Acción confirmada")}
                            />
                        </div>
                    )}
                </CustomAlert>
            )}
        </>
    );
}