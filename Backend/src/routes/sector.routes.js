import { Router } from 'express';
import { crearSector, obtenerSectores } from '../controllers/sector.controller.js';

const router = Router();

router.post('/', crearSector);
router.get('/', obtenerSectores);

export default router;
