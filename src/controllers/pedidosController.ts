import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Cliente } from "../models/clientesModel";
import { MetodoPago } from "../models/metodosPagoModel";
import { Pedido } from "../models/pedidosModel";
import { EstadoPedido } from "../models/estadoPedidoModel";

class PedidosController {
  private pedidoRepository = AppDataSource.getRepository(Pedido);
  private clienteRepository = AppDataSource.getRepository(Cliente);
  private metodoPagoRepository = AppDataSource.getRepository(MetodoPago);
  private estadoPedidoRepository = AppDataSource.getRepository(EstadoPedido);

  async create(req: Request, res: Response) {
    const { clienteId, metodoPagoId, estadoPedidoId, ...pedidoData } = req.body;
    try {
      const cliente = await this.clienteRepository.findOneBy({
        id: clienteId,
      });
      const metodoPago = await this.metodoPagoRepository.findOneBy({
        id: metodoPagoId,
      });
      const estadoPedido = await this.clienteRepository.findOneBy({
        id: estadoPedidoId,
      });

      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
      } else if (!metodoPago) {
        res.status(404).json({ message: "Método de pago no encontrado" });
      } else if (!estadoPedido) {
        res.status(404).json({ message: "Estado de pedido no encontrado" });
      } else {
        const nuevoPedido = this.pedidoRepository.create({
          ...pedidoData,
          cliente: cliente,
          metodo_pago: metodoPago,
          estado_pedido: estadoPedido,
        });

        const result = await this.pedidoRepository.save(nuevoPedido);
        res.status(201).json(result);
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      res.status(500).json({ message: "Error al crear el pedido" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const pedidos = await this.pedidoRepository.find({
        relations: ["cliente", "metodo_pago", "estado_pedido"],
      });
      res.status(200).json(pedidos);
    } catch (err) {
      console.error("Error al obtener los pedidos:", err);
      res.status(500).json({ message: "Error al obtener los pedidos" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pedidoId = parseInt(id);

      if (isNaN(pedidoId)) {
        res.status(400).json({ message: "ID inválido" });
      }

      const pedido = await this.pedidoRepository.findOne({
        where: { id: pedidoId }, // Buscar por ID
        relations: ["cliente", "metodo_pago", "estado_pedido"],
      });

      if (!pedido) {
        res.status(404).json({ message: "Pedido no encontrado" });
      } else {
        res.status(200).json(pedido);
      }
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      res.status(500).json({ message: "Error al obtener el pedido" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        envio_domicilio,
        precio_total,
        anticipo,
        monto_por_cobrar,
        clienteId,
        metodoPagoId,
        estadoPedidoId,
      } = req.body;

      const pedido = await this.pedidoRepository.findOneBy({ id: Number(id) });

      if (!pedido) {
        res.status(404).json({ message: "Pedido no encontrado" });
      } else {
        // Actualiza los campos solo si se proporcionan
        if (envio_domicilio) pedido.envio_domicilio = envio_domicilio;
        if (precio_total) pedido.precio_total = precio_total;
        if (anticipo) pedido.anticipo = anticipo;
        if (monto_por_cobrar) pedido.monto_por_cobrar = monto_por_cobrar;
        if (clienteId) {
          const cliente = await this.clienteRepository.findOneBy({
            id: clienteId,
          });
          if (!cliente) {
            res.status(404).json({ message: "Cliente no encontrado" });
          } else {
            pedido.cliente = cliente;
          }
        }
        if (metodoPagoId) {
          const metodoPago = await this.metodoPagoRepository.findOneBy({
            id: metodoPagoId,
          });
          if (!metodoPago) {
            res.status(404).json({ message: "Metodo de pago no encontrado" });
          } else {
            pedido.metodo_pago = metodoPago;
          }
        }
        if (estadoPedidoId) {
          const estadoPedido = await this.estadoPedidoRepository.findOneBy({
            id: estadoPedidoId,
          });
          if (!estadoPedido) {
            res.status(404).json({ message: "Estado de pedido no encontrado" });
          } else {
            pedido.estado_pedido = estadoPedido;
          }
        }
        pedido.updateAt = new Date();

        await this.pedidoRepository.save(pedido);
        res.status(200).json(pedido);
      }
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      res.status(500).json({ message: "Error al actualizar el pedido" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      res.send("Eliminar");
    } catch (err) {
      if (err instanceof Error) res.status(500).send(err.message);
    }
  }
}

export default new PedidosController();
