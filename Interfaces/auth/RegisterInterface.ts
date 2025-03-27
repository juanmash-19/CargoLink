export interface RegisterDTO {
    name : string,
    lastname : string,
    email: string,
    role: string,
    password : string,
    confirmPassword : string,
}

export interface RegisterDAO {
    message: string,
    token: string,
    user: {
        name: string,
        lastname: string,
        email: string,
        phone: string,
        role: string,
        password: string,
        _id: string,
    }
}