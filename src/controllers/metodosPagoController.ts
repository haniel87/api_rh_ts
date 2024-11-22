import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { MetodoPago } from "../models/metodosPagoModel";

export class MetodoPagoController {
  private metodoPagoRepository = AppDataSource.getRepository(MetodoPago);

  // Crear un nuevo método de pago
  async create(req: Request, res: Response) {
    try {
      const { tipo } = req.body;

      // Validación de entrada
      if (!tipo) {
        res
          .status(400)
          .json({ message: "El tipo de método de pago es obligatorio" });
      }

      const nuevoMetodoPago = this.metodoPagoRepository.create({
        tipo,
        createAt: new Date(),
        updateAt: new Date(),
      });

      await this.metodoPagoRepository.save(nuevoMetodoPago);
      res.status(201).json(nuevoMetodoPago);
    } catch (error) {
      console.error("Error al crear el método de pago:", error);
      res.status(500).json({ message: "Error al crear el método de pago" });
    }
  }

  // Obtener todos los métodos de pago
  async findAll(req: Request, res: Response) {
    try {
      const metodosPago = await this.metodoPagoRepository.find();
      res.status(200).json(metodosPago);
    } catch (error) {
      console.error("Error al obtener los métodos de pago:", error);
      res.status(500).json({ message: "Error al obtener los métodos de pago" });
    }
  }

  // Obtener un método de pago por ID
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const metodoPago = await this.metodoPagoRepository.findOneBy({
        id: Number(id),
      });

      if (!metodoPago) {
        res.status(404).json({ message: "Método de pago no encontrado" });
      } else {
        res.status(200).json(metodoPago);
      }
    } catch (error) {
      console.error("Error al obtener el método de pago:", error);
      res.status(500).json({ message: "Error al obtener el método de pago" });
    }
  }

  // Actualizar un método de pago
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { tipo } = req.body;

      const metodoPago = await this.metodoPagoRepository.findOneBy({
        id: Number(id),
      });

      if (!metodoPago) {
        res.status(404).json({ message: "Método de pago no encontrado" });
      } else {
        // Actualiza el campo tipo solo si se proporciona
        if (tipo) metodoPago.tipo = tipo;
        metodoPago.updateAt = new Date();

        await this.metodoPagoRepository.save(metodoPago);
        res.status(200).json(metodoPago);
      }
    } catch (error) {
      console.error("Error al actualizar el método de pago:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el método de pago" });
    }
  }

  // Eliminar un método de pago
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const metodoPago = await this.metodoPagoRepository.findOneBy({
        id: Number(id),
      });

      if (!metodoPago) {
        res.status(404).json({ message: "Método de pago no encontrado" });
      } else {
        await this.metodoPagoRepository.remove(metodoPago);
        res.status(204).send(); // No content
      }
    } catch (error) {
      console.error("Error al eliminar el método de pago:", error);
      res.status(500).json({ message: "Error al eliminar el método de pago" });
    }
  }
}

export default new MetodoPagoController();
