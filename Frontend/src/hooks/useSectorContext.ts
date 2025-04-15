import { useContext } from "react";
import { SectorContext } from "../context/SectorContext";

export const useSectorContext = () => {
  const context = useContext(SectorContext);
  if (!context) {
    throw new Error("useSector must be used within a SectorProvider");
  }
  return context;
};
