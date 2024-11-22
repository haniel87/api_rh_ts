import express from 'express';
import estadoPedidoController from  '../controllers/estadoPedidoController';

const router = express.Router();


router.get('/', estadoPedidoController.findAll.bind(estadoPedidoController))

router.post('/', estadoPedidoController.create.bind(estadoPedidoController))

router.route("/:id")
    .get(estadoPedidoController.findOne.bind(estadoPedidoController))
    .put(estadoPedidoController.update.bind(estadoPedidoController))
    .delete(estadoPedidoController.delete.bind(estadoPedidoController))

export default router;