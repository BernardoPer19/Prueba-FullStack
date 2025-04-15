import { useEffect, useState } from "react";

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

export const useNominatimAutocomplete = (query: string) => {
  const [results, setResults] = useState<NominatimResult[]>([]);

  useEffect(() => {
    if (query.length < 3) return;

    const ciudades = [
      "Cochabamba, Bolivia",
      "La Paz, Bolivia",
      "Medellín, Colombia",
    ];

    const fetchData = async () => {
      try {
        const fetches = ciudades.map((ciudad) =>
          fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              `${query}, ${ciudad}`
            )}&format=json&addressdetails=1&limit=2`
          ).then((res) => res.json())
        );

        const resultados = await Promise.all(fetches);
        const combinados = resultados.flat(); 
        setResults(combinados);
      } catch (err) {
        console.error("Error al buscar direcciones:", err);
      }
    };

    const timeout = setTimeout(fetchData, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return results;
};
