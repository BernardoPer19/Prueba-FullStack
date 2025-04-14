import { useSectores } from "../hooks/useSectores";

export const SectorTable = () => {
  const { sectores, loading, error } = useSectores();

  if (loading) return <p>Cargando sectores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Sectores registrados</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Horario</th>
          </tr>
        </thead>
        <tbody>
          {sectores.map((sector) => (
            <tr key={sector.id}>
              <td className="border px-4 py-2">{sector.nombre}</td>
              <td className="border px-4 py-2">{sector.direccion}</td>
              <td className="border px-4 py-2">{sector.horario.inicio}</td>
              <td className="border px-4 py-2">{sector.horario.fin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
