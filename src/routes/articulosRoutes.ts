import express from 'express';
import articulosController from '../controllers/articulosController';

const router = express.Router();

router.get('/', articulosController.findAll.bind(articulosController))
router.post('/', articulosController.create.bind(articulosController))

router.route("/:id")
    .get(articulosController.findOne.bind(articulosController))
    .put(articulosController.update.bind(articulosController))
    .delete(articulosController.delete.bind(articulosController))

export default router;