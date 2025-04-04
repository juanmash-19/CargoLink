export interface DepartmentDAO {
    id: string;
    name: string;
}

export interface CityDAO {
    id: string;
    name: string;
}

export interface DepartmentsDAO {
    message?: string;
    departments: DepartmentDAO[];
}

export interface CitiesDAO {
    message?: string;
    cities: CityDAO[];
}