import { LoginDTO, LoginDAO } from "@/Interfaces/auth/LoginInterface";
// import { useLoadingStore } from "@/store/LoadingSpinner";

import { envVariables } from "@/utils/config";

export const loginUser = async (body: LoginDTO): Promise<LoginDAO> => {
    // const { startLoading, stopLoading } = useLoadingStore();

    try {
        // startLoading();
        const response = await fetch(`${envVariables.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error de autenticacion");
        }

        return await response.json() as LoginDAO;
    } catch (error) {
        console.error("Error en autenticación:", error);
        throw new Error("No se pudo completar la autenticación. Por favor, inténtalo de nuevo.");
    } finally {
        // stopLoading();
    }
};

export const refreshToken = async (): Promise<{ token: string }> => {
    try {
        const response = await fetch(`${envVariables.API_URL}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include', // Para enviar cookies al backend
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al renovar el token:", errorData);
            throw new Error(errorData.message || "Error al renovar el token");
        }

        return await response.json() as { token: string };
    } catch (error) {
        console.error("Error al renovar el token:", error);
        throw new Error("No se pudo renovar el token. Por favor, inténtalo de nuevo.");
    }
};