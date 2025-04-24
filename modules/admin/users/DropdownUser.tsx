'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomAlert from "@/components/atoms/CustomAlert";

export default function DropdownUser() {
    const router = useRouter();
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
                buttonText="Menú"
                options={[
                    {
                        text: "Crear usuario",
                        onClick: createOption,
                    },
                    {
                        text: "Organizar por rol",
                        onClick: () => handleAlert("Opción 2 seleccionada"),
                    },
                    {
                        text: "Organizar por correo",
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