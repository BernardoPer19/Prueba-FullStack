import { ToastContainer } from "react-toastify";
import { useUbicacion } from "../hooks/useUbicacion";
import CardUbicaciones from "../components/CardUbicaciones";

export default function ValidarUbicacion() {
  const { sectoresDisponibles, loading, error } = useUbicacion();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Zonas cercanas disponibles
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando ubicación y sectores...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sectoresDisponibles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectoresDisponibles.map((s) => (
            <CardUbicaciones s={s} />
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
