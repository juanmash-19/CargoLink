import { UsersDAO, UserDAO, UserDTO } from "@/Interfaces/user/UserInterface";

import Cookies from 'js-cookie';

import { envVariables } from "@/utils/config"
import { MessageDAO } from "@/Interfaces/GeneralInterfaces";
import { GeneralStatsDAO } from "@/Interfaces/GeneralInterfaces";
import { ShipmentsDAO, ShipmentDAO, ShipmentDTO } from "@/Interfaces/shipment/ShipmentInterface";

export const getUsers = async (): Promise<UsersDAO> => {
    const token = Cookies.get('token');
    if(token){

        try{
            const response = await fetch(`${envVariables.API_URL}/admin/`, {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as UsersDAO;

        }catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("No se pudo obtener los usuarios. Por favor, inténtalo de nuevo.");
        }

    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const getShipments = async (): Promise<ShipmentsDAO> => {
    const token = Cookies.get('token');
    if(token){

        try{
            const response = await fetch(`${envVariables.API_URL}/admin/shipments`, {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as ShipmentsDAO;

        }catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("No se pudo obtener los usuarios. Por favor, inténtalo de nuevo.");
        }

    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const getUserById = async (userId: string): Promise<UserDAO> => {
    const token = Cookies.get('token');
    if(token){

        try{
            const response = await fetch(`${envVariables.API_URL}/admin/${userId}`, {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as UserDAO;

        }catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw new Error("No se pudo obtener el usuario. Por favor, inténtalo de nuevo.");
        }

    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const searchUsers = async (term: string): Promise<UsersDAO> => {
    
    const token = Cookies.get('token');
    if(token){

        try{
            const response = await fetch(`${envVariables.API_URL}/admin/search?term=${term}`, {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as UsersDAO;

        }catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("No se pudo obtener los usuarios. Por favor, inténtalo de nuevo.");
        }

    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const searchShipments = async (term: string): Promise<ShipmentsDAO> => {
    
    const token = Cookies.get('token');
    if(token){

        try{
            const response = await fetch(`${envVariables.API_URL}/admin/shipments/search?term=${term}`, {
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as ShipmentsDAO;

        }catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("No se pudo obtener los usuarios. Por favor, inténtalo de nuevo.");
        }

    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const putUserById = async (body: UserDTO, userId: string): Promise<UserDAO> => {
    
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/${userId}`,{
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
                throw new Error(errorData.message || "Error de edicion");
            }
    
            return await response.json() as UserDAO;
        }catch(error){
            console.error("Error en la edicion", error);
            throw new Error("No se pudo completar la edicion. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const putShipmentById = async (body: ShipmentDTO, shipmentId: string): Promise<ShipmentDAO> => {
    
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/shimpents/${shipmentId}`,{
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
                throw new Error(errorData.message || "Error de edicion");
            }
    
            return await response.json() as ShipmentDAO;
        }catch(error){
            console.error("Error en la edicion", error);
            throw new Error("No se pudo completar la edicion. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const deleteUserById = async (userId: string): Promise<MessageDAO> => {
    
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/${userId}`,{
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
                throw new Error(errorData.message || "Error de eliminacion");
            }
    
            return await response.json() as MessageDAO;
        }catch(error){
            console.error("Error en la edicion", error);
            throw new Error("No se pudo completar la eliminacion. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const deleteShipmentById = async (shipmentId: string): Promise<MessageDAO> => {
    
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/shipments/${shipmentId}`,{
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
                throw new Error(errorData.message || "Error de eliminacion");
            }
    
            return await response.json() as MessageDAO;
        }catch(error){
            console.error("Error en la edicion", error);
            throw new Error("No se pudo completar la eliminacion. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const createUser = async (body: UserDTO): Promise<UserDAO> => {
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/`,{
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
                throw new Error(errorData.message || "Error de creacion");
            }

            return await response.json() as UserDAO;
        } catch(error){
            console.error("Error en la creacion", error);
            throw new Error("No se pudo completar la creación. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const getGeneralStats = async (): Promise<GeneralStatsDAO> => {
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/admin/stats`,{
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

            return await response.json() as GeneralStatsDAO;
        } catch(error){
            console.error("Error en la obtencion de estadisticas", error);
            throw new Error("No se pudo obtener las estadisticas. Por favor, inténtalo de nuevo.");
        }
    } else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}