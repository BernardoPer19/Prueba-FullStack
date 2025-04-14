const { z } = require("zod");

const sectorSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  direccion: z.string().min(1, { message: "La dirección es obligatoria" }),
  lat: z.number().refine((value) => value >= -90 && value <= 90, {
    message: "La latitud debe estar entre -90 y 90",
  }),
  lng: z.number().refine((value) => value >= -180 && value <= 180, {
    message: "La longitud debe estar entre -180 y 180",
  }),
  horario: z.object({
    inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
      message: "El horario de inicio debe estar en formato HH:MM",
    }),
    fin: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
      message: "El horario de fin debe estar en formato HH:MM",
    }),
  }),
});

const validarDatosSector = (data) => {
  const parsedData = sectorSchema.safeParse(data);

  if (!parsedData.success) {
    return parsedData.error.format();
  }

  return null;
};

module.exports = {
  validarDatosSector,
};
