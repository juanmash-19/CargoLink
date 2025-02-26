import { z } from "zod";

// const testEmail = "usuario@gmail.com";
// const testPassword = "Admin$1#8.";

const safeStringRegex = /^[^<>{}&"'`]*$/;

export const loginSchemes = z
  .object({
    email: z
      .string()
      .nonempty({message : "*Porfavor introduzca su correo"})
      .email({ message: "*El correo es incorrecto" })
      .regex(safeStringRegex, {
        message: "*El correo no puede contener caracteres especiales peligrosos",
      }),
    password: z
      .string()
      .nonempty({message : "*Porfavor introduzca su contraseña"})
      .regex(safeStringRegex, {
        message: "*El correo no puede contener caracteres especiales peligrosos",
      }),
})
//   .refine((data) => data.email === testEmail, {
//     message: "*Correo incorrecto",
//     path: ["email"],
//   })
//   .refine((data) => data.password === testPassword, {
//     message: "*Contraseña incorrecta",
//     path: ["password"],
//   });
