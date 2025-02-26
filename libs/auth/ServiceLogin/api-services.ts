import { LoginDTO, LoginDAO } from "@/Interfaces/auth/LoginInterface"

export const loginUser = async (body: LoginDTO): Promise<LoginDAO> => {
    try{
        const response = await fetch(`http://localhost:3336/api/auth/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error de autenticacion")
        }

        return await response.json() as LoginDAO;
    }catch(error){
        console.error("Error en autenticación:", error);
        throw new Error("No se pudo completar la autenticación. Por favor, inténtalo de nuevo.");
    }
}