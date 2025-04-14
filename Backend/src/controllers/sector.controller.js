const { db } = require("../firebase/config.js");
const { validarDatosSector } = require("../schema/Sectores.schema.js");

const crearSector = async (req, res) => {
  try {
    const { nombre, direccion, lat, lng, horario } = req.body;

    const error = validarDatosSector(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const nuevoSector = { nombre, direccion, lat, lng, horario };

    await db.collection("sectores").add(nuevoSector);
    res.status(201).json({ mensaje: "Sector creado exitosamente" });
  } catch (error) {
    console.error('Error al crear sector:', error);
    res.status(500).json({ error: error.message });
  }
};

const obtenerSectores = async (req, res) => {
  try {
    const snapshot = await db.collection("sectores").get();
    const sectores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(sectores);
  } catch (error) {
    console.error('Error al obtener sectores:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearSector,
  obtenerSectores,
};
