import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { toast } from "react-toastify";
import { type SectorConDistancia } from "../types/FildsTypes";
import { useSectorContext } from "./useSectorContext";

export const useUbicacion = () => {
  const { sectores, loading: loadingSectores } = useSectorContext();

  const [sectoresDisponibles, setSectoresDisponibles] = useState<
    SectorConDistancia[]
  >([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validarUbicacion = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const now = new Date();
          const horaActual = `${now
            .getHours()
            .toString()
            .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

          const disponibles = sectores
            .map((s) => {
              const distancia = getDistance(
                { latitude, longitude },
                { latitude: Number(s.lat), longitude: Number(s.lng) }
              );
              const distanciaKm = Math.round((distancia / 1000) * 10) / 10;

              return { ...s, distanciaKm };
            })
            .filter(
              (s) =>
                s.distanciaKm <= 5 &&
                horaActual >= s.horario.inicio &&
                horaActual <= s.horario.fin
            );

          setSectoresDisponibles(disponibles);
          setLoading(false);
          if (disponibles.length > 0) {
            toast.success("Zonas encontradas cerca de tu ubicación");
          } else {
            toast.info("No se encontró ninguna zona cerca");
          }
        },
        () => {
          setError(
            "No se pudo obtener la ubicación del usuario. Verifica la ubicacion del dispositivo por favor"
          );
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
