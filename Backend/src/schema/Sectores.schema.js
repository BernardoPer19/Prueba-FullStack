const { z } = require("zod");

const sectorSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  direccion: z.string().min(1, { message: "La dirección es obligatoria" }),
  lat: z.coerce.number().refine((value) => value >= -90 && value <= 90, {
    message: "La latitud debe estar entre -90 y 90",
  }),
  lng: z.coerce.number().refine((value) => value >= -180 && value <= 180, {
    message: "La longitud debe estar entre -180 y 180",
  }),
  horario: z
    .object({
      inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "El horario de inicio debe estar en formato HH:MM",
      }),
      fin: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "El horario de fin debe estar en formato HH:MM",
      }),
    })
    .refine((data) => data.inicio < data.fin, {
      message: "La hora de inicio debe ser anterior a la hora de fin",
    }),
});

const validarDatosSector = (data) => {
  const result = sectorSchema.safeParse(data);

  if (!result.success) {
    return { valid: false, errors: result.error.format() };
  }
  return { valid: true, data: result.data };
};

module.exports = { validarDatosSector };
