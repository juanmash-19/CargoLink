export interface UserDTO{
    userId?: string,
    name? : string,
    lastname? : string,
    email?: string,
    role?: string,
    phone?: string,
    password?: string,
}

export interface PasswordDTO{
    password: string,
}

export interface ChangePasswordDTO{
    password: string,
    newPassword: string,
}

export interface UserDAO {
    message?: string,
    user: {
        _id: string,
        name: string,
        lastname: string,
        email: string,
        role: string,
        phone?: string,
        password?: string,
    }
}

export interface UsersDAO {
    message?: string,
    users: UserDAO[],
}

export interface VerifyDAO {
    message: string,
    verify: boolean,
}