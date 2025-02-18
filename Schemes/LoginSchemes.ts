import {z} from 'zod' 

const testPassword = "Admin$1#8."

export const loginSchemes = z.object({
        email: z.string()
          .email({ message: "El correo es incorrecto" }),
        password: z.string()
          .min(5, { message: "Se requieren 5 caracteres mínimo" })

      }).refine((data) => data.password === testPassword, {
        message: "Contraseña incorrecta",
        path: ["password"]
      });     
