import {z} from "zod"

export const registerSchemes = z.object({

    name: z.string()
        .min(2, { message: "Introduzca un nombre válido" })
        .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras" }), 

    surname: z.string()
        .min(2, { message: "Introduzca un apellido válido" })
        .regex(/^[a-zA-Z\s]+$/, { message: "El apellido solo puede contener letras" }),

    email: z.string().email({
        message: "Correo invalido"
    }),

    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/, 
        { message: "Mínimo 5 caracteres, una mayúscula, una minúscula, un número y un carácter especial" }
    ),

    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
});
