import { db } from '../firebase/config.js';

export const crearSector = async (req, res) => {
  try {
    const { nombre, direccion, lat, lng, horario } = req.body;
    if (!nombre || !direccion || !lat || !lng || !horario) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const nuevoSector = { nombre, direccion, lat, lng, horario };
    await db.collection('sectores').add(nuevoSector);
    res.status(201).json({ mensaje: 'Sector creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerSectores = async (req, res) => {
  try {
    const snapshot = await db.collection('sectores').get();
    const sectores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(sectores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
