import { z } from "zod";

// const testEmail = "usuario@gmail.com";
// const testPassword = "Admin$1#8.";

export const loginSchemes = z
  .object({
    email: z
      .string()
      .nonempty({message : "*Porfavor introduzca su correo"})
      .email({ message: "*El correo es incorrecto" }),
    password: z
      .string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/, 
        { message: "*Mínimo 5 caracteres, una mayúscula, una minúscula, un número y un carácter especial" }
      )
})
//   .refine((data) => data.email === testEmail, {
//     message: "*Correo incorrecto",
//     path: ["email"],
//   })
//   .refine((data) => data.password === testPassword, {
//     message: "*Contraseña incorrecta",
//     path: ["password"],
//   });
