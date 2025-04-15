import React, { createContext, ReactNode } from "react";
import { useSectores } from "../hooks/useSectores";
import { NuevoTiposSector, TiposSector } from "../types/FildsTypes";

interface SectorContextProps {
  sectores: TiposSector[];
  loading: boolean;
  error: string | null;
  addSector: (nuevo: NuevoTiposSector) => Promise<void>;
  fetchSectores: () => Promise<void>;
}

export const SectorContext = createContext<SectorContextProps | undefined>(
  undefined
);

export const SectorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sectores, loading, error, addSector, fetchSectores } = useSectores();

  return (
    <SectorContext.Provider
      value={{ sectores, loading, error, addSector, fetchSectores }}
    >
      {children}
    </SectorContext.Provider>
  );
};
