import { useForm } from "react-hook-form";
import { useSectores } from "../hooks/useSectores";
import { NuevoTiposSector } from "../types/FildsTypes";
import { toast } from "react-toastify";

export const SectorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<NuevoTiposSector>();
  const { addSector } = useSectores();

  const onSubmit = async (data: NuevoTiposSector) => {
    try {
      const response = await addSector(data);
      if (response?.mensaje) {
        toast.success(response.mensaje);
        reset();
      }
    } catch (error) {
      console.error("Error completo:", error);
    }
  };

  const horarioInicio = watch("horario.inicio");
  const horarioFin = watch("horario.fin");

  const validarHoras =
    horarioInicio !== "" && horarioFin !== "" && horarioInicio >= horarioFin;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 shadow-lg rounded-xl bg-white"
    >
      <h2 className="text-xl font-semibold">Registrar nuevo sector</h2>

      <input
        type="text"
        placeholder="Nombre del sector"
        {...register("nombre", { required: "Este campo es obligatorio" })}
        className="border p-2 w-full"
      />
      {errors.nombre && (
        <p className="text-red-500 text-sm">{errors.nombre.message}</p>
      )}

      <input
        type="text"
        placeholder="Dirección"
        {...register("direccion", { required: "Este campo es obligatorio" })}
        className="border p-2 w-full"
      />
      {errors.direccion && (
        <p className="text-red-500 text-sm">{errors.direccion.message}</p>
      )}

      <input
        type="number"
        step="any"
        placeholder="Latitud"
        {...register("lat", {
          required: "Latitud requerida",
          valueAsNumber: true,
          min: -90,
          max: 90,
        })}
        className="border p-2 w-full"
      />
      {errors.lat && (
        <p className="text-red-500 text-sm">{errors.lat?.message}</p>
      )}

      <input
        type="number"
        step="any"
        placeholder="Longitud"
        {...register("lng", {
          required: "Longitud requerida",
          valueAsNumber: true,
          min: -180,
          max: 180,
        })}
        className="border p-2 w-full"
      />
      {errors.lng && (
        <p className="text-red-500 text-sm">{errors.lng?.message}</p>
      )}

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Hora de inicio (ej: 08:00)"
          {...register("horario.inicio", {
            required: "Hora de inicio requerida",
            pattern: {
              value: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
              message: "Formato incorrecto de hora (HH:MM)",
            },
          })}
          className="border p-2 w-full"
        />
        {errors.horario?.inicio && (
          <p className="text-red-500 text-sm">
            {errors.horario.inicio?.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Hora de fin (ej: 20:00)"
          {...register("horario.fin", {
            required: "Hora de fin requerida",
            pattern: {
              value: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
              message: "Formato incorrecto de hora (HH:MM)",
            },
          })}
          className="border p-2 w-full"
        />
        {errors.horario?.fin && (
          <p className="text-red-500 text-sm">{errors.horario.fin?.message}</p>
        )}
      </div>

      {validarHoras && (
        <p className="text-red-500 text-sm">
          La hora de inicio no puede ser mayor que la de fin.
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Crear sector
      </button>
    </form>
  );
};
