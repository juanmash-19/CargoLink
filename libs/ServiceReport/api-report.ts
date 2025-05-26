import { ReportDTO, ReportResponse, ReportsResponse } from '@/Interfaces/report/ReportInterface';
import Cookies from 'js-cookie';
import { envVariables } from "@/utils/config";

/**
 * Create a new report
 * @param reportData - The report data to submit
 * @returns A promise with the report response
 */
export async function createReport(reportData: ReportDTO): Promise<ReportResponse> {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No se encontró un token. Por favor, inicia sesión.');
  }
  
  try {
    const response = await fetch(`${envVariables.API_URL}/reports`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Este es el error:", errorData);
      throw new Error(errorData.message || "Error al crear el reporte");
    }

    return await response.json() as ReportResponse;

  } catch (error) {
    console.error("Error al crear el reporte:", error);
    throw new Error("No se pudo crear el reporte. Por favor, inténtalo de nuevo.");
  }
}

/**
 * Get reports for the current user
 * @returns A promise with the user's reports
 */
export async function getUserReports(): Promise<ReportsResponse> {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No se encontró un token. Por favor, inicia sesión.');
  }
  
  try {
    const response = await fetch(`${envVariables.API_URL}/reports/me`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Este es el error:", errorData);
      throw new Error(errorData.message || "Error al obtener los reportes");
    }

    return await response.json() as ReportsResponse;

  } catch (error) {
    console.error("Error al obtener los reportes:", error);
    throw new Error("No se pudieron obtener los reportes. Por favor, inténtalo de nuevo.");
  }
}
