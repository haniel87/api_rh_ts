import express from 'express';
import metodosPagoController from  '../controllers/metodosPagoController';

const router = express.Router();


router.get('/', metodosPagoController.findAll.bind(metodosPagoController))

router.post('/', metodosPagoController.create.bind(metodosPagoController))

router.route("/:id")
    .get(metodosPagoController.findOne.bind(metodosPagoController))
    .put(metodosPagoController.update.bind(metodosPagoController))
    .delete(metodosPagoController.delete.bind(metodosPagoController))

export default router;