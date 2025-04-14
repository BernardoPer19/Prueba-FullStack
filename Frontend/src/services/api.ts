import axios from 'axios';

const API_URL = 'http://localhost:3000/sectores'; // Cambia esto según la URL de tu servidor

// Función para obtener los sectores (GET)
export const obtenerSectores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener los sectores:', error);
    throw error;
  }
};

export const crearSector = async (sector) => {
  try {
    const response = await axios.post(API_URL, sector);
    return response.data;
  } catch (error) {
    console.error('Error al crear el sector:', error);
    throw error;
  }
};
