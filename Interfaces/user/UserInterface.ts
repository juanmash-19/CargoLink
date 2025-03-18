export interface UserDTO{
    userId?: string,
    name? : string,
    lastname? : string,
    email?: string,
    role?: string,
    phone?: string,
    password?: string,
}

export interface UserDAO{
    message?: string,
    _id : string,
    name : string,
    lastname : string,
    email: string,
    role: string,
    phone?: string,
    password?: string,
}

export interface UsersDAO{
    message?: string,
    users: UserDAO[],
}