import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerSectores() {
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      const res = await axios.get('http://localhost:3000/sectores');
      setSectores(res.data);
    };
    obtener();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Sectores registrados</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {sectores.map((s) => (
            <tr key={s.id} className="border-t">
              <td>{s.nombre}</td>
              <td>{s.direccion}</td>
              <td>{s.horario.inicio} - {s.horario.fin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}