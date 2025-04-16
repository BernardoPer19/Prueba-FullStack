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
      className="space-y-4 p-5 shadow-2xl rounded-xl bg-white w-[600px]"
    >
      <h2 className="text-xl font-semibold">Registrar nuevo sector</h2>

      <div>
        <label htmlFor="nombre" className="text-sm text-gray-600">
          Nombre del sector
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="(ej. Zona Comercial Centra)"
          {...register("nombre", { required: "Este campo es obligatorio" })}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="direccion" className="text-sm text-gray-600">
          Dirección
        </label>
        <input
          id="direccion"
          type="text"
          placeholder="(Ej. Avenida America Cochabmb, Bolivia)"
          value={direccionInput}
          onChange={(e) => setDireccionInput(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
        {errors.direccion && (
          <p className="text-red-500 text-sm">{errors.direccion.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lat" className="text-sm text-gray-600">
          Latitud
        </label>
        <input
          id="lat"
          type="number"
          step="any"
          placeholder="(Ej. -17.3800)"
          {...register("lat", {
            required: "Latitud requerida",
            valueAsNumber: true,
            min: -90,
            max: 90,
          })}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.lat && (
          <p className="text-red-500 text-sm">{errors.lat?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lng" className="text-sm text-gray-600">
          Longitud
        </label>
        <input
          id="lng"
          type="number"
          step="any"
          placeholder="(Ej. 66.1570)"
          {...register("lng", {
            required: "Longitud requerida",
            valueAsNumber: true,
            min: -180,
            max: 180,
          })}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.lng && (
          <p className="text-red-500 text-sm">{errors.lng?.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <div className="w-full">
          <label htmlFor="hora-inicio" className="text-sm text-gray-600">
            Hora de inicio
          </label>
          <input
            id="hora-inicio"
            type="text"
            placeholder="Hora de inicio (ej: 08:00)"
            {...register("horario.inicio", {
              required: "Hora de inicio requerida",
              pattern: {
                value: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                message: "Formato incorrecto de hora (HH:MM)",
              },
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {errors.horario?.inicio && (
            <p className="text-red-500 text-sm">
              {errors.horario.inicio?.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="hora-fin" className="text-sm text-gray-600">
            Hora de fin
          </label>
          <input
            id="hora-fin"
            type="text"
            placeholder="Hora de fin (ej: 20:00)"
            {...register("horario.fin", {
              required: "Hora de fin requerida",
              pattern: {
                value: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                message: "Formato incorrecto de hora (HH:MM)",
              },
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {errors.horario?.fin && (
            <p className="text-red-500 text-sm">
              {errors.horario.fin?.message}
            </p>
          )}
        </div>
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
