import { RegisterDTO, RegisterDAO } from "@/Interfaces/auth/RegisterInterface"

import { envVariables } from "@/utils/config";

export const registerUser = async (body: RegisterDTO): Promise<RegisterDAO> => {
    try{
        const response = await fetch(`${envVariables.API_URL}/auth/register`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        if(!response.ok) {
            const errorData = await response.json();
            console.error("Este es el error:", errorData);
            throw new Error(errorData.message || "Error de registro");
        }

        return await response.json() as RegisterDAO;
    }catch(error){
        console.error("Error en el registro:", error);
        throw new Error("No se pudo completar el registro. Por favor, inténtalo de nuevo.");
    }
}
