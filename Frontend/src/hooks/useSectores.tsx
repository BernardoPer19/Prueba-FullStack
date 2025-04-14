import { useEffect, useState } from "react";
import { type NuevoTiposSector, TiposSector } from "../types/FildsTypes";
import {
  CrearSectorRequest,
  obtenerSectorRequest,
} from "../api/SectoresRequest";
import { toast } from "react-toastify";

export const useSectores = () => {
  const [sectores, setSectores] = useState<TiposSector[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSectores = async () => {
    try {
      setLoading(true);
      const res = await obtenerSectorRequest();

      setSectores(res);
    } catch (err) {
      setError("Error al cargar los sectores");
    } finally {
      setLoading(false);
    }
  };

  const addSector = async (nuevo: NuevoTiposSector) => {
    console.log("Datos a enviar al backend:", nuevo);
    try {
      const response = await CrearSectorRequest(nuevo);
      fetchSectores();
      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError("Error al crear el sector");
        toast.error(err.message);
      } else {
        setError("Error desconocido");
        toast.error("Error desconocido");
      }

      throw err;
    }
  };

  useEffect(() => {
    fetchSectores();
  }, []);

  return {
    sectores,
    loading,
    error,
    addSector,
    fetchSectores,
  };
};
