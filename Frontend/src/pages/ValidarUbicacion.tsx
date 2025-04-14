import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDistance } from 'geolib';

export default function ValidarUbicacion() {
  const [sectoresDisponibles, setSectoresDisponibles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await axios.get('http://localhost:3000/sectores');
        const now = new Date();
        const horaActual = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const disponibles = res.data.filter((s) => {
          const distancia = getDistance(
            { latitude, longitude },
            { latitude: Number(s.lat), longitude: Number(s.lng) }
          );
          return (
            distancia <= 5000 &&
            horaActual >= s.horario.inicio &&
            horaActual <= s.horario.fin
          );
        });

        setSectoresDisponibles(disponibles);
      } catch (err) {
        setError('No se pudo obtener la ubicación o los sectores.');
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Validación de Ubicación</h2>
      {error && <p className="text-red-500">{error}</p>}
      {sectoresDisponibles.length > 0 ? (
        <ul className="list-disc list-inside">
          {sectoresDisponibles.map((s) => (
            <li key={s.id}>{s.nombre} ({s.horario.inicio} - {s.horario.fin})</li>
          ))}
        </ul>
      ) : (
        <p>No hay sectores con servicio disponible en tu zona.</p>
      )}
    </div>
  );
}
