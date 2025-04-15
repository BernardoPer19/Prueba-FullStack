import { useForm } from "react-hook-form";
import { useSectores } from "../hooks/useSectores";
import { NuevoTiposSector } from "../types/FildsTypes";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNominatimAutocomplete } from "../hooks/useNominatimAutocomplete ";

export const SectorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<NuevoTiposSector>();
  const { addSector } = useSectores();

  const [direccionInput, setDireccionInput] = useState("");
  const sugerencias = useNominatimAutocomplete(direccionInput);

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
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      {errors.nombre && (
        <p className="text-red-500 text-sm">{errors.nombre.message}</p>
      )}

      <div className="relative">
        <input
          type="text"
          placeholder="Dirección"
          value={direccionInput}
          onChange={(e) => {
            setDireccionInput(e.target.value);
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {sugerencias.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full shadow-md rounded-md mt-1 max-h-40 overflow-y-auto">
            {sugerencias.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setDireccionInput(item.display_name);
                  setValue("direccion", item.display_name);
                  setValue("lat", parseFloat(item.lat));
                  setValue("lng", parseFloat(item.lon));
                }}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

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
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
        className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 transition-colors"
      >
        Crear sector
      </button>
    </form>
  );
};
