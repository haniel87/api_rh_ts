import express from 'express';
import pedidosController from  '../controllers/pedidosController';

const router = express.Router();


router.get('/', pedidosController.findAll.bind(pedidosController))

router.post('/', pedidosController.create.bind(pedidosController))

router.route("/:id")
    .get(pedidosController.findOne.bind(pedidosController))
    .put(pedidosController.update.bind(pedidosController))
    .delete(pedidosController.delete.bind(pedidosController))

export default router;