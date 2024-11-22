import express from 'express';
import ingresosDiariosController from  '../controllers/ingresosDiariosController';

const router = express.Router();


router.get('/', ingresosDiariosController.findAll.bind(ingresosDiariosController))

router.post('/', ingresosDiariosController.create.bind(ingresosDiariosController))

router.route("/:id")
    .get(ingresosDiariosController.findOne.bind(ingresosDiariosController))
    .put(ingresosDiariosController.update.bind(ingresosDiariosController))
    .delete(ingresosDiariosController.delete.bind(ingresosDiariosController))

export default router;