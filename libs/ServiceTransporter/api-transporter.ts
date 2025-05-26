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

/**
 * Confirm that the shipment is in transit
 * @param shipmentId ID of the shipment
 * @returns Response with success message
 */
export const confirmShipmentTransit = async (shipmentId: string) => {
  const token = Cookies.get('token');
    try {
        const response = await fetch(`${envVariables.API_URL}/shipments/transit/${shipmentId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        });
        
        if (!response.ok) {
            throw new Error('Failed to mark shipment as in transit');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error marking shipment as in transit:', error);
        throw error;
    }
};

/**
 * Confirm the delivery of the shipment
 * @param shipmentId ID of the shipment
 * @returns Response with success message
 */
export const confirmShipmentDelivery = async (shipmentId: string) => {
  const token = Cookies.get('token');
    try {
        const response = await fetch(`${envVariables.API_URL}/shipments/deliver/${shipmentId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        });
        
        if (!response.ok) {
            throw new Error('Failed to confirm shipment delivery');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error confirming shipment delivery:', error);
        throw error;
    }
};

/**
 * Get general stats for the transporter dashboard
 * @returns Object with stats for cards and charts
 */
export const getDriverStats = async () => {
  const token = Cookies.get('token');
  if (!token) throw new Error("No se encontró un token. Por favor, inicia sesión.");

  try {
    const response = await fetch(`${envVariables.API_URL}/shipments/driver/stats`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener estadísticas del transportador");
    }

    // Espera que el backend devuelva algo como:
    // {
    //   disponibles: number,
    //   activos: number,
    //   completados: number,
    //   disponiblesStats: number[],
    //   activosStats: number[],
    //   completadosStats: number[]
    // }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener estadísticas del transportador:", error);
    throw error;
  }
};