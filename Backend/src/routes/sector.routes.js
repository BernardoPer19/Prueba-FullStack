const { Router } = require("express");
const {
  crearSector,
  obtenerSectores,
} = require("../controllers/sector.controller.js");

const sectorRoutes = Router();

sectorRoutes.post("/", crearSector);
sectorRoutes.get("/", obtenerSectores);

module.exports = sectorRoutes;
