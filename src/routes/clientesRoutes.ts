import express from 'express';
import clientessController from  '../controllers/clientesController';

const router = express.Router();


router.get('/', clientessController.findAll.bind(clientessController))

router.post('/', clientessController.create.bind(clientessController))

router.route("/:id")
    .get(clientessController.findOne.bind(clientessController))
    .put(clientessController.update.bind(clientessController))
    .delete(clientessController.delete.bind(clientessController))

export default router;