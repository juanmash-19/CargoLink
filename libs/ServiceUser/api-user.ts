import { UserDTO, UserDAO, VerifyDAO, PasswordDTO } from "@/Interfaces/user/UserInterface"

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

export const verifyPassword = async (body: PasswordDTO): Promise<VerifyDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/verify-password`,{
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as VerifyDAO;
        }catch(error){
            console.error("Error al verificar la contraseña:", error);
            throw new Error("No se pudo verificar la contraseña. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const updateUser = async (body: UserDTO): Promise<UserDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/profile`,{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
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

export const getUser = async (): Promise<UserDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/profile`,{
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
            console.error("Error al obtener el usuario:", error);
            throw new Error("No se pudo obtener el usuario. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const changePassword = async (body: PasswordDTO): Promise<VerifyDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/change-password`,{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as VerifyDAO;
        }catch(error){
            console.error("Error al cambair la contraseña:", error);
            throw new Error("No se pudo cambiar la contraseña. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const deleteUser = async (): Promise<VerifyDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/users/profile`,{
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as VerifyDAO;
        }catch(error){
            console.error("Error al eliminar el usuario:", error);
            throw new Error("No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}