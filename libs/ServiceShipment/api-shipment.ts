import { ShipmentDTO, ShipmentDAO, ShipmentsDAO } from "@/Interfaces/shipment/ShipmentInterface";
import { envVariables } from "@/utils/config";
import Cookies from "js-cookie";

export const createShipment = async (body: ShipmentDTO): Promise<ShipmentDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/shipments/`,{
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

            return await response.json() as ShipmentDAO;
        }
        catch(error){
            console.error("Error en la creación:", error);
            throw new Error("No se pudo completar la creación. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const getShipment = async (id: string, serverToken?: string): Promise<ShipmentDAO> => {

    var token = serverToken;

    if(!token) {
        token = Cookies.get('token');
    }
    
    if(token){
        try {
            const response = await fetch(`${envVariables.API_URL}/shipments/${id}`,{
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }

            return await response.json() as ShipmentDAO;
        }
        catch (error){
            console.error("Error en la obtencion:", error);
            throw new Error("No se pudo completar la obtencion. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
}

export const updateShipment = async (body: ShipmentDTO, id: string): Promise<ShipmentDAO> => {
    const token = Cookies.get('token');
    if(token){   
        try{
            const response = await fetch(`${envVariables.API_URL}/shipments/${id}`,{
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
                throw new Error(errorData.message || "Error de actualizacion");
            }

            return await response.json() as ShipmentDAO;
        }
        catch(error){
            console.error("Error en la actualización:", error);
            throw new Error("No se pudo completar la actualización. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }

}

export const setActivatedShipment = async (id: string): Promise<ShipmentDAO> => {
    const body: ShipmentDTO = {
        status: "activated",
    };
    return await updateShipment(body, id);
}

export const setCancelledShipment = async (id: string): Promise<ShipmentDAO> => {
    const body: ShipmentDTO = {
        status: "cancelled",
    };
    return await updateShipment(body, id);
}

export const uploadImageToCloudinary = async (selectedImage: File): Promise<string> => {
    const token = Cookies.get('token');
    if(token){   
        try {
            const data = new FormData();
            data.append('file', selectedImage);
            data.append('upload_preset', `${envVariables.CLOUDINARY_UPLOAD_PRESET}`);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${envVariables.CLOUDINARY_CLOUD_NAME}/image/upload/`,
                {
                    method: 'POST',
                    body: data,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al subir la imagen:", errorData);
                throw new Error(errorData.message || "Error al subir la imagen");
            }

            const result = await response.json();
            console.log(`${result.secure_url}/c_fill,w_300,h_300`)
            return result.secure_url; // URL de la imagen subida
        } catch (error) {
            console.error("Error en la subida de la imagen:", error);
            throw new Error("No se pudo subir la imagen. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    }
};

export const getAvailableShipments = async (): Promise<ShipmentsDAO> => {
    
    const token = Cookies.get('token');
    if(token){
        try{
            const response = await fetch(`${envVariables.API_URL}/shipments/available`,{
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                console.error("Este es el error:", errorData);
            }
    
            return await response.json() as ShipmentsDAO;
        } catch (error) {
            console.error("Error en la obtencion:", error);
            throw new Error("No se pudo completar la obtencion. Por favor, inténtalo de nuevo.");
        }
    }else{
        throw new Error("No se encontró un token. Por favor, inicia sesión.");
    } 
}