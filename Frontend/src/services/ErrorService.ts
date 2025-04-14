import axios from "axios";
import { CustomError } from "../error/error";

export default function handleError(error: unknown) {
  // 🔴 Errores personalizados (locales)
  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }

  // 🟡 Errores de Axios (respuesta del backend)
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error || "Error desconocido del servidor";
    const status = error.response?.status || 500;

    return {
      statusCode: status,
      body: message,
    };
  }

  // 🔵 Otros errores JS
  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  // 🟣 Por si acaso algo raro llega
  return {
    statusCode: 500,
    body: String(error),
  };
}
