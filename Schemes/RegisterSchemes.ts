import {z} from "zod"

export const registerSchemes = z.object({

    name: z.string()
        .nonempty({message : "*Este campo es obligatorio"}) 
        .max(30, {message: "*Maximo de caracteres permitidos"})
        .min(2, { message: "*No hay suficientes caracteres" })
        .regex(/^[a-zA-Z ]+$/, { message: "El nombre no puede contener numeros o caracteres especiales" }),

    lastname: z.string()
        .nonempty({message : "*Este campo es obligatorio"})
        .max(30, {message: "*Maximo de caracteres permitidos"})
        .min(2, { message: "*No hay suficientes caracteres" })
        .regex(/^[a-zA-Z ]+$/, { message: "*El apellido no puede contener numeros o caracteres especiales" }),

    email: z.string().email({
        message: "*Correo invalido"
    }),

    password: z.string()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/, 
        { message: "*Mínimo 5 caracteres, una mayúscula, una minúscula, un número y un carácter especial" }
    ),

    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "*Las contraseñas no coinciden",
    path: ["confirmPassword"]
});
