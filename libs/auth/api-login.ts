import { LoginDTO, LoginDAO } from "@/Interfaces/auth/LoginInterface"
// import { useLoadingStore } from "@/store/LoadingSpinner";

import { envVariables } from "@/utils/config";

export const loginUser = async (body: LoginDTO): Promise<LoginDAO> => {
    // const { startLoading, stopLoading } = useLoadingStore();

    try{
        // startLoading();
        const response = await fetch(`${envVariables.API_URL}/auth/login`,{
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
    }finally{
        // stopLoading();
    }
}