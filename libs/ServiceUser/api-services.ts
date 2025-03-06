import { UserDTO, UserDAO } from "@/Interfaces/user/UserInterface"

import Cookies from 'js-cookie';

import { envVariables } from "@/utils/config";

export const getRoleUser = async (): Promise<UserDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/role`,{
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as UserDAO;
        }catch(error){
            console.error("Error al obtener el rol:", error);
            throw new Error("No se pudo obtener el rol. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}
