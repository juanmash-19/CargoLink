'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomAlert from "@/components/atoms/CustomAlert";
import CustomButton from "@/components/atoms/CustomButton";

export default function DropdownShipment() {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'options'>('success');

    const createOption = () => {
        router.push("/admin/users/create");
    };

    const handleOrganization = (optionType: string) => {
        setAlertMessage(`Envios organizados por ${optionType}`);
        setAlertType('success');
        setShowAlert(true);
    };

    return (
        <>
            <CustomDropdown
                buttonText="Menú"
                options={[
                    {
                        text: "Crear Envio",
                        onClick: createOption,
                    },
                    {
                        text: "Organizar por precio",
                        onClick: () => handleOrganization("precio"),
                    },
                    {
                        text: "Organizar por fecha de creación",
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