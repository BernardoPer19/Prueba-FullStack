import { useEffect, useState } from "react";
import { crearSector, obtenerSectores } from "../services/api";

const SectorComponent = () => {
  const [sectores, setSectores] = useState([]);
  const [nuevoSector, setNuevoSector] = useState('');

  // Obtener sectores al cargar el componente
  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const sectoresData = await obtenerSectores();
        setSectores(sectoresData);
      } catch (error) {
        console.error('No se pudo obtener los sectores:', error);
      }
    };
    fetchSectores();
  }, []);

  // Crear un nuevo sector
  const handleCrearSector = async () => {
    if (nuevoSector.trim() !== '') {
      try {
        const sector = { nombre: nuevoSector };
        const sectorCreado = await crearSector(sector);
        setSectores([...sectores, sectorCreado]);
        setNuevoSector('');
      } catch (error) {
        console.error('Error al crear el sector:', error);
      }
    }
  };

  return (
    <div>
      <h1>Sectores</h1>
      <ul>
        {sectores.map((sector) => (
          <li key={sector.id}>{sector.nombre}</li>
        ))}
      </ul>
      <input
        type="text"
        value={nuevoSector}
        onChange={(e) => setNuevoSector(e.target.value)}
        placeholder="Nuevo sector"
      />
      <button onClick={handleCrearSector}>Crear Sector</button>
    </div>
  );
};

export default SectorComponent;
