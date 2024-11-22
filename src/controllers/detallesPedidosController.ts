import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { DetallePedido } from "../models/detallesPedidosModel";
import { Pedido } from "../models/pedidosModel";
import { Articulo } from "../models/articulosModel";

class DetallesPedidoController {
  private detallePedidoRepository = AppDataSource.getRepository(DetallePedido);

  async create(req: Request, res: Response) {
    try {
      const { cantidad, precio_venta, pedido_id, articulo_id } = req.body;

      // Validación de entrada
      if (!cantidad || !precio_venta || !pedido_id || !articulo_id) {
        res.status(400).json({
          message:
            "Cantidad, precio de venta, ID de pedido y ID de artículo son obligatorios",
        });
      }

      const nuevoDetalle = this.detallePedidoRepository.create({
        cantidad,
        precio_venta,
        createAt: new Date(),
        updateAt: new Date(),
        pedido_id: { id: pedido_id }, // Asignar el objeto de Pedido
        articulo_id: { id: articulo_id }, // Asignar el objeto de Articulo
      });

      await this.detallePedidoRepository.save(nuevoDetalle);
      res.status(201).json(nuevoDetalle);
    } catch (error) {
      console.error("Error al crear el detalle de pedido:", error);
      res.status(500).json({ message: "Error al crear el detalle de pedido" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const detalles = await this.detallePedidoRepository.find({
        relations: ["pedido_id", "articulo_id"], // Cargar relaciones
      });
      res.status(200).json(detalles);
    } catch (error) {
      console.error("Error al obtener los detalles de pedidos:", error);
      res
        .status(500)
        .json({ message: "Error al obtener los detalles de pedidos" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detalle = await this.detallePedidoRepository.findOne({
        where: { id: Number(id) },
        relations: ["pedido_id", "articulo_id"], // Cargar relaciones
      });

      if (!detalle) {
        res.status(404).json({ message: "Detalle de pedido no encontrado" });
      }

      res.status(200).json(detalle);
    } catch (error) {
      console.error("Error al obtener el detalle de pedido:", error);
      res
        .status(500)
        .json({ message: "Error al obtener el detalle de pedido" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cantidad, precio_venta, pedido_id, articulo_id } = req.body;

      const detalle = await this.detallePedidoRepository.findOne({
        where: { id: Number(id) },
        relations: ["pedido_id", "articulo_id"],
      });

      if (!detalle) {
        res.status(404).json({ message: "Detalle de pedido no encontrado" });
      } else {
        // Actualiza los campos básicos
        if (cantidad !== undefined) detalle.cantidad = cantidad;
        if (precio_venta !== undefined) detalle.precio_venta = precio_venta;
        detalle.updateAt = new Date();

        // Si se proporciona un nuevo ID de pedido, busca el objeto de Pedido
        if (pedido_id !== undefined) {
          const pedido = await AppDataSource.getRepository(Pedido).findOneBy({
            id: pedido_id,
          });
          if (pedido) {
            detalle.pedido_id = pedido; // Asignar objeto de Pedido
          } else {
            res.status(404).json({ message: "Pedido no encontrado" });
          }
        }

        // Si se proporciona un nuevo ID de artículo, busca el objeto de Articulo
        if (articulo_id !== undefined) {
          const articulo = await AppDataSource.getRepository(
            Articulo
          ).findOneBy({ id: articulo_id });
          if (articulo) {
            detalle.articulo_id = articulo; // Asignar objeto de Articulo
          } else {
            res.status(404).json({ message: "Artículo no encontrado" });
          }
        }

        await this.detallePedidoRepository.save(detalle);
        res.status(200).json(detalle);
      }
    } catch (error) {
      console.error("Error al actualizar el detalle de pedido:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el detalle de pedido" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detalle = await this.detallePedidoRepository.findOneBy({
        id: Number(id),
      });

      if (!detalle) {
        res.status(404).json({ message: "Detalle de pedido no encontrado" });
      } else {
        await this.detallePedidoRepository.remove(detalle);
        res.status(204).send(); // No content
      }
    } catch (error) {
      console.error("Error al eliminar el detalle de pedido:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar el detalle de pedido" });
    }
  }
}
export default new DetallesPedidoController();
