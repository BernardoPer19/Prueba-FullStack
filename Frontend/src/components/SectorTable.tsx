import { useSectorContext } from "../hooks/useSectorContext";

export const SectorTable = () => {
  const { sectores, loading, error } = useSectorContext();

  if (loading) return <p>Cargando sectores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Sectores registrados
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 w-full">
          <tr className="px-6 py-3">
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Dirección</th>
            <th className="px-6 py-3">Horario</th>
          </tr>
        </thead>
        <tbody>
          {sectores.map((sector) => (
            <tr
              key={sector.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-5 py-3">{sector.nombre}</td>
              <td className="px-5 py-3">{sector.direccion}</td>
              <td className="px-5 py-3">
                {sector.horario.inicio} - {sector.horario.fin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
