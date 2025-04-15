import { useUbicacion } from "../hooks/useUbicacion";

export default function ValidarUbicacion() {
  const { sectoresDisponibles, loading, error } = useUbicacion();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Validación de Ubicación</h2>

      {loading ? (
        <p>Cargando ubicación y sectores...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sectoresDisponibles.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {sectoresDisponibles.map((s) => (
            <li key={s.id}>
              {s.nombre} ({s.horario.inicio} - {s.horario.fin})
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay sectores con servicio disponible en tu zona.</p>
      )}
    </div>
  );
}
