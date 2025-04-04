// Esquema Zod actualizado (userSchema.ts)
import { z } from 'zod';

const safeStringRegex = /^[^<>{}&"'`]*$/; // Permite cadena vacía y sin caracteres prohibidos 

export const UserEditScheme = z.object({
  name: z.string()
    .transform(val => val.trim())
    .superRefine((val, ctx) => {
      if (val.length > 0 && (val.length < 2 || val.length > 40)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El nombre debe tener entre 2 y 40 caracteres'
        });
      }
    })
    .optional(),

  lastname: z.string()
    .transform(val => val.trim())
    .superRefine((val, ctx) => {
      if (val.length > 0 && (val.length < 2 || val.length > 40)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El apellido debe tener entre 2 y 40 caracteres'
        });
      }
    })
    .optional(),

  email: z.string()
    .email('El correo electrónico no es válido')
    .optional()
    .or(z.literal('')), // Permite campo vacío

  phone: z.string()
    .transform(val => val.trim())
    .refine(val => val === '' || /^\d+$/.test(val), {
      message: 'Solo se permiten números'
    })
    .refine(val => val === '' || (val.length >= 7 && val.length <= 15), {
      message: 'Debe tener entre 7 y 15 dígitos'
    })
    .optional(),

  password: z.string()
    .optional() // Campo opcional
    .superRefine((val, ctx) => {
      // Solo validar si el campo tiene contenido
      if (val && val !== '') {
        // Validación de caracteres prohibidos
        if (!safeStringRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "*La contraseña no puede contener caracteres especiales",
          });
        }
      }
    })
    .optional()
});
