const { db } = require("../firebase/config.js");
const { validarDatosSector } = require("../schema/Sectores.schema.js");

const crearSector = async (req, res) => {
  try {
    const result = validarDatosSector(req.body);

    if (!result.valid) {
      return res.status(400).json({ error: result.errors });
    }

    const { nombre, direccion, lat, lng, horario } = result.data;

    const nuevoSector = { nombre, direccion, lat, lng, horario };

    const snapshot = await db
      .collection("sectores")
      .where("nombre", "==", nombre)
      .get();

    if (!snapshot.empty) {
      return res.status(400).json({
        error: "Ya existe un sector con ese nombre",
      });
    }

    await db.collection("sectores").add(nuevoSector);
    res.status(201).json({ mensaje: "Sector creado exitosamente" });
  } catch (error) {
    console.error("Error al crear sector:", error);
    res.status(500).json({ error: "Error al crear un nuevo Sector" });
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
    console.error("Error al obtener sectores:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearSector,
  obtenerSectores,
};
