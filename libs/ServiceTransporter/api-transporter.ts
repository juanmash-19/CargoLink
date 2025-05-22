import { ShipmentDAO } from "@/Interfaces/shipment/ShipmentInterface";
import Cookies from 'js-cookie';
import { envVariables } from "@/utils/config";
import { MessageDAO } from "@/Interfaces/GeneralInterfaces";

/**
 * Get shipment details for a transporter
 * @param shipmentId ID of the shipment
 * @returns Response with shipment data
 */
export const getTransporterShipment = async (shipmentId: string): Promise<ShipmentDAO> => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await fetch(`${envVariables.API_URL}/shipments/transporter/${shipmentId}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Este es el error:", errorData);
        throw new Error(errorData.message || "Error al obtener el envío");
      }

      return await response.json() as ShipmentDAO;
    } catch (error) {
      console.error("Error al obtener el envío:", error);
      throw new Error("No se pudo obtener el envío. Por favor, inténtalo de nuevo.");
    }
  } else {
    throw new Error("No se encontró un token. Por favor, inicia sesión.");
  }
};

/**
 * Accept a shipment as a transporter
 * @param shipmentId ID of the shipment to accept
 * @returns Response with success message
 */
export const acceptShipment = async (shipmentId: string): Promise<MessageDAO> => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await fetch(`${envVariables.API_URL}/shipments/accept/${shipmentId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Este es el error:", errorData);
        throw new Error(errorData.message || "Error al aceptar el envío");
      }

      return await response.json() as MessageDAO;
    } catch (error) {
      console.error("Error al aceptar el envío:", error);
      throw new Error("No se pudo aceptar el envío. Por favor, inténtalo de nuevo.");
    }
  } else {
    throw new Error("No se encontró un token. Por favor, inicia sesión.");
  }
};
