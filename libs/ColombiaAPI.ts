import { DepartmentsDAO, CitiesDAO, DepartmentDAO, CityDAO } from "@/Interfaces/apis/ColombiaAPIInterface";

export async function fetchDepartments(): Promise<DepartmentDAO[]> {
    try {
        const response = await fetch("https://api-colombia.com/api/v1/department");
        if (!response.ok) throw new Error("Error al obtener departamentos");
        const data: DepartmentsDAO = await response.json();

        // Asegúrate de que data es un array antes de mapear
        if (!Array.isArray(data)) throw new Error("Los datos obtenidos no son un array");

        // Mapear los datos para que coincidan con la interfaz DepartmentDAO
        return data.map((department) => ({
            id: department.id.toString(),
            name: department.name,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchCities(departmentCode: string): Promise<CityDAO[]> {
    try {
        const response = await fetch(`https://api-colombia.com/api/v1/department/${departmentCode}/cities`);
        if (!response.ok) throw new Error("Error al obtener ciudades");
        const data: CitiesDAO = await response.json();

        // Asegúrate de que data es un array antes de mapear
        if (!Array.isArray(data)) throw new Error("Los datos obtenidos no son un array");

        // Mapear los datos para que coincidan con la interfaz CityDAO
        return data.map((city) => ({
            id: city.id.toString(),
            name: city.name,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}
