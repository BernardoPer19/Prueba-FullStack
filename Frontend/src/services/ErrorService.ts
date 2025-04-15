import axios from "axios";
import { CustomError } from "../error/error";

export default function handleError(error: unknown) {

  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }


  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error || "Error desconocido del servidor";
    const status = error.response?.status || 500;

    return {
      statusCode: status,
      body: message,
    };
  }


  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }


  return {
    statusCode: 500,
    body: String(error),
  };
}
