import express from 'express';
import rangosEnvioController from  '../controllers/rangosEnvioController';

const router = express.Router();


router.get('/', rangosEnvioController.consultar.bind(rangosEnvioController))

router.post('/', rangosEnvioController.insertar.bind(rangosEnvioController))

router.route("/:id")
    .get(rangosEnvioController.consultarDetalle.bind(rangosEnvioController))
    .put(rangosEnvioController.actualizar.bind(rangosEnvioController))
    .delete(rangosEnvioController.eliminar.bind(rangosEnvioController))

export default router;