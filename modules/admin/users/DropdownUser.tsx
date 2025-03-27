'use client'
import CustomDropdown from "@/components/atoms/CustomDropdown";
import { useRouter } from "next/navigation";

export default function DropdownUser() {
    const router = useRouter();

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
                buttonText="Menú"
                options={[
                    {
                        text: "Crear usuario",
                        onClick: createOption,
                    },
                    {
                        text: "Organizar por rol",
                        onClick: handleOption2,
                    },
                    {
                        text: "Organizar por correo",
                        onClick: handleOption3,
                    },
                ]}
                variant="primary"
            />
        </>
    );
}