import express from 'express';
import detallesPedidosController from  '../controllers/detallesPedidosController';

const router = express.Router();


router.get('/', detallesPedidosController.findAll.bind(detallesPedidosController))

router.post('/', detallesPedidosController.create.bind(detallesPedidosController))

router.route("/:id")
    .get(detallesPedidosController.findOne.bind(detallesPedidosController))
    .put(detallesPedidosController.update.bind(detallesPedidosController))
    .delete(detallesPedidosController.delete.bind(detallesPedidosController))

export default router;