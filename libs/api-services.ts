
import { headers } from "next/headers"

type FormLoginInputs = {
    email: string,
    password: string,
}

export const loginUser = (body: FormLoginInputs) => {
    const headerOptions = {
        method : 'POST',
        body: JSON.stringify(body),
        headers : {
            "Authorization" : "Bearer tokentosendinservice"
        }
    }
    fetch('', headerOptions)
}

type FormRegisterInputs = {
    name:string,
    surname: string,
    email:string,
    password: string,
    confirmPassword: string,
}

export const registerUser = (body: FormRegisterInputs) => {
    const headerOptions = {
        method : 'POST',
        body: JSON.stringify(body),
        headers: {
             "Authorization" : "Bearer tokentosendinservice"
        }
    }

    fetch('', headerOptions)
}


