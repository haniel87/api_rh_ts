import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Cliente } from "../models/clientesModel";

class ClientesController {
  private clienteRepository = AppDataSource.getRepository(Cliente);

  async create(req: Request, res: Response) {
    try {
      const { nombre, telefono, direccion } = req.body;

      if (!nombre || !telefono) {
        res
          .status(400)
          .json({ message: "El nombre y el teléfono son obligatorios" });
      }

      const nuevoCliente = this.clienteRepository.create({
        nombre,
        telefono,
        direccion,
        createAt: new Date(),
        updateAt: new Date(),
      });

      await this.clienteRepository.save(nuevoCliente);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      res.status(500).json({ message: "Error al crear el cliente" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const clientes = await this.clienteRepository.find();
      res.status(200).json(clientes);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      res.status(500).json({ message: "Error al obtener los clientes" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await this.clienteRepository.findOneBy({
        id: Number(id),
      });

      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
      } else {
        res.status(200).json(cliente);
      }
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      res.status(500).json({ message: "Error al obtener el cliente" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, telefono, direccion } = req.body;

      const cliente = await this.clienteRepository.findOneBy({
        id: Number(id),
      });

      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
      } else {
        cliente.nombre = nombre || cliente.nombre;
        cliente.telefono = telefono || cliente.telefono;
        cliente.direccion = direccion || cliente.direccion;
        cliente.updateAt = new Date();

        await this.clienteRepository.save(cliente);
        res.status(200).json(cliente);
      }
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      res.status(500).json({ message: "Error al actualizar el cliente" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await this.clienteRepository.findOneBy({
        id: Number(id),
      });

      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
      } else {
        await this.clienteRepository.remove(cliente);
        res.status(204).send();
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      res.status(500).json({ message: "Error al eliminar el cliente" });
    }
  }
}
export default new ClientesController();
