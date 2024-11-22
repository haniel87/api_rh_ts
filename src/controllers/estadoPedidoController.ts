import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { EstadoPedido } from "../models/estadoPedidoModel";

export class EstadoPedidoController {
  private estadoPedidoRepository = AppDataSource.getRepository(EstadoPedido);

  // Crear un nuevo estado de pedido
  async create(req: Request, res: Response) {
    try {
      const { estado } = req.body;

      // Validación de entrada
      if (!estado) {
        res
          .status(400)
          .json({ message: "El estado de pedido es obligatorio" });
      }

      const nuevoEstadoPedido = this.estadoPedidoRepository.create({
        estado,
        createAt: new Date(),
        updateAt: new Date(),
      });

      await this.estadoPedidoRepository.save(nuevoEstadoPedido);
      res.status(201).json(nuevoEstadoPedido);
    } catch (error) {
      console.error("Error al crear el estado de Pedido:", error);
      res.status(500).json({ message: "Error al crear el estado de Pedido" });
    }
  }

  // Obtener todos los estados de pedidos
  async findAll(req: Request, res: Response) {
    try {
      const estadoPedido = await this.estadoPedidoRepository.find();
      res.status(200).json(estadoPedido);
    } catch (error) {
      console.error("Error al obtener los estados de pedidos:", error);
      res.status(500).json({ message: "Error al obtener los estados de pedidos" });
    }
  }

  // Obtener un estado de pedido por ID
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const estadoPedido = await this.estadoPedidoRepository.findOneBy({
        id: Number(id),
      });

      if (!estadoPedido) {
        res.status(404).json({ message: "Estado de pedido no encontrado" });
      }
      else{
        res.status(200).json(estadoPedido);
      }

    } catch (error) {
      console.error("Error al obtener el estado de pedido:", error);
      res.status(500).json({ message: "Error al obtener el estado de pedido" });
    }
  }

  // Actualizar un estado de pedido
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const estadoPedido = await this.estadoPedidoRepository.findOneBy({
        id: Number(id),
      });

      if (!estadoPedido) {
        res.status(404).json({ message: "Estado de pedido no encontrado" });
      } else {
        // Actualiza el campo estado solo si se proporciona
        if (estado) estadoPedido.estado = estado;
        estadoPedido.updateAt = new Date();

        await this.estadoPedidoRepository.save(estadoPedido);
        res.status(200).json(estadoPedido);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de pedido:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el estado de pedido" });
    }
  }

  // Eliminar un estado de pedido
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const estadoPedido = await this.estadoPedidoRepository.findOneBy({
        id: Number(id),
      });

      if (!estadoPedido) {
        res.status(404).json({ message: "estado de pedido no encontrado" });
      } else {
        await this.estadoPedidoRepository.remove(estadoPedido);
        res.status(204).send(); // No content
      }
    } catch (error) {
      console.error("Error al eliminar el estado de pedido:", error);
      res.status(500).json({ message: "Error al eliminar el estado de pedido" });
    }
  }
}

export default new EstadoPedidoController();
