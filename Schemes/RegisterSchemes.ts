import {z} from "zod"

export const registerSchemes = z.object({
    name: z.string()
            .min(2, {message: "introduzca un nombre valido"})
            .regex(/^[a_z A_Z]*$/), 
    surname: z.string()
            .min(2, {message: "introduzca un apellido valido"})
            .regex(/^[a_z A_Z]*$/),
    email: z.string().email({
        message : "Correo Invalido, se requiere minimo una @"
    }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&][0_9]{5,}$/, 
        {message: "Minimo 5 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"}),

    confirPassword: z.string()
            
})


//validamos si lo que se esta ingresando en el campo confirmPassword es exactamente igual a password
.refine(data => data.password === data.confirPassword, {
    message: "La contrasena no es igual,  verifica nuemvamente",
    path: ["confirmPassword"] //Indico en que campo esta sucediendo este error
})