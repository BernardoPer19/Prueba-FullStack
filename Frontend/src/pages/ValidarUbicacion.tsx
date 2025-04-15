import { ToastContainer } from "react-toastify";
import { useUbicacion } from "../hooks/useUbicacion";

export default function ValidarUbicacion() {
  const { sectoresDisponibles, loading, error } = useUbicacion();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        📍 Zonas cercanas disponibles
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando ubicación y sectores...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sectoresDisponibles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectoresDisponibles.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {s.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                📌 Dirección: {s.direccion}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                🕒 Horario: {s.horario.inicio} - {s.horario.fin}
              </p>
              <p className="text-sm text-gray-600">
                Distancia:
                <span className="font-semibold">{s.distanciaKm} km</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-sm border border-yellow-300">
          <p className="text-center font-medium">
            No hay sectores disponibles en tu zona en este momento.
            <br />
            Podés intentarlo más tarde o cambiar de ubicación.
          </p>
        </div>
      )}
    </div>
  );
}
