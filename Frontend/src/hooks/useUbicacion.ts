import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { TiposSector } from "../types/FildsTypes";
import { useSectores } from "./useSectores";

export const useUbicacion = () => {
  const { sectores, loading: loadingSectores } = useSectores();
  const [sectoresDisponibles, setSectoresDisponibles] = useState<TiposSector[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validarUbicacion = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const now = new Date();
          const horaActual = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

          const disponibles = sectores.filter((s) => {
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
          setLoading(false);
        },
        () => {
          setError("No se pudo obtener la ubicación del usuario.");
          setLoading(false);
        }
      );
    };

    if (!loadingSectores) validarUbicacion();
  }, [sectores, loadingSectores]);

  return {
    sectoresDisponibles,
    loading,
    error,
  };
};
