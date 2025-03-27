export interface LoginDTO {
    email: string,
    password: string,
}

export interface LoginDAO {
    message: string,
    token: string,
}