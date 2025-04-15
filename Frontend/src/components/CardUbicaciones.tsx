import { SectorConDistancia } from "../types/FildsTypes";

interface Props {
  s: SectorConDistancia;
}

function CardUbicaciones({ s }: Props) {
  return (
    <>
      <div
        key={s.id}
        className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{s.nombre}</h3>
        <p className="text-sm text-gray-600 mb-1">Dirección: {s.direccion}</p>
        <p className="text-sm text-gray-600 mb-1">
          🕒 Horario: {s.horario.inicio} - {s.horario.fin}
        </p>
        <p className="text-sm text-gray-600">
          Distancia:
          <span className="font-semibold">{s.distanciaKm} km</span>
        </p>
      </div>
    </>
  );
}

export default CardUbicaciones;
