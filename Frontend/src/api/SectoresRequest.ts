import axios, { AxiosError } from "axios";
import handleError from "../services/ErrorService";
import { type NuevoTiposSector } from "../types/FildsTypes";
import { toast } from "react-toastify";

export const obtenerSectorRequest = async () => {
  
  try {
    const response = await axios.get("http://localhost:3000/sectores");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        "Error desconocido";
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};

export const CrearSectorRequest = async (nuevo: NuevoTiposSector) => {
  try {
    const response = await axios.post("http://localhost:3000/sectores", nuevo);
    toast.success("Sector creado exitosamente");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        "Error desconocido";
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};
