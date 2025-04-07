import { z } from "zod";

export const ShipmentEditScheme = z.object({
  pickupAddress: z
    .string()
    .trim()
    .min(5, "La dirección de recogida debe tener entre 5 y 100 caracteres")
    .max(100, "La dirección de recogida debe tener entre 5 y 100 caracteres")
    .optional(),

  deliveryAddress: z
    .string()
    .trim()
    .min(5, "La dirección de entrega debe tener entre 5 y 100 caracteres")
    .max(100, "La dirección de entrega debe tener entre 5 y 100 caracteres")
    .optional(),

  description: z
    .string()
    .trim()
    .min(5, "La descripción debe tener entre 5 y 200 caracteres")
    .max(200, "La descripción debe tener entre 5 y 200 caracteres")
    .optional(),

  title: z
    .string()
    .trim()
    .min(5, "El título debe tener entre 5 y 25 caracteres")
    .max(25, "El título debe tener entre 5 y 25 caracteres")
    .optional(),

  weight: z
    .number()
    .min(0.1, "El peso debe ser un número mayor que 0")
    .optional(),

  dimensions: z
    .object({
      height: z
        .number()
        .min(0.1, "La altura debe ser un número mayor que 0")
        .optional(),
      width: z
        .number()
        .min(0.1, "El ancho debe ser un número mayor que 0")
        .optional(),
      length: z
        .number()
        .min(0.1, "El largo debe ser un número mayor que 0")
        .optional(),
    })
    .optional(),

  pickupTime: z
    .string()
    .refine(
      (val) => 
        !val || 
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(val),
      "La fecha y hora deben tener un formato válido (ISO 8601)"
    )
    .optional(),

  cost: z
    .number()
    .min(0, "El costo debe ser un número mayor o igual a 0")
    .optional(),

  status: z
    .enum([
      "pending",
      "activated",
      "accepted",
      "in_transit",
      "delivered",
      "cancelled",
    ])
    .optional(),

  transporter: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/, 
      "El ID del transportador no es válido"
    )
    .optional(),
});