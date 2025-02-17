import {z} from 'zod' 

export const loginSchemes = z.object({
    email: z.string()
            .min(5, {message: "Se requiere 5 caracteres minimo"}),
    password: z.string()
            .min(5, {message: "Se requiere 5 caracteres minimo"})
})