import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { IngresoDiario } from "../models/ingresosDiariosModel";

class IngresoDiarioController {
  private ingresoDiarioRepository = AppDataSource.getRepository(IngresoDiario);

  async create(req: Request, res: Response) {
    try {
      const { fecha, total_ingresos } = req.body;

      // Validación de entrada
      if (!fecha || total_ingresos === undefined) {
        res
          .status(400)
          .json({ message: "Fecha y total de ingresos son obligatorios" });
      }

      const nuevoIngreso = this.ingresoDiarioRepository.create({
        fecha,
        total_ingresos,
        createAt: new Date(),
        updateAt: new Date(),
      });

      await this.ingresoDiarioRepository.save(nuevoIngreso);
      res.status(201).json(nuevoIngreso);
    } catch (error) {
      console.error("Error al crear el ingreso diario:", error);
      res.status(500).json({ message: "Error al crear el ingreso diario" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const ingresos = await this.ingresoDiarioRepository.find();
      res.status(200).json(ingresos);
    } catch (error) {
      console.error("Error al obtener los ingresos diarios:", error);
      res
        .status(500)
        .json({ message: "Error al obtener los ingresos diarios" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ingreso = await this.ingresoDiarioRepository.findOneBy({
        id: Number(id),
      });

      if (!ingreso) {
        res.status(404).json({ message: "Ingreso diario no encontrado" });
      }

      res.status(200).json(ingreso);
    } catch (error) {
      console.error("Error al obtener el ingreso diario:", error);
      res.status(500).json({ message: "Error al obtener el ingreso diario" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fecha, total_ingresos } = req.body;

      const ingreso = await this.ingresoDiarioRepository.findOneBy({
        id: Number(id),
      });

      if (!ingreso) {
        res.status(404).json({ message: "Ingreso diario no encontrado" });
      } else {
        // Actualiza los campos solo si se proporcionan
        if (fecha) ingreso.fecha = fecha;
        if (total_ingresos !== undefined)
          ingreso.total_ingresos = total_ingresos;
        ingreso.updateAt = new Date();

        await this.ingresoDiarioRepository.save(ingreso);
        res.status(200).json(ingreso);
      }
    } catch (error) {
      console.error("Error al actualizar el ingreso diario:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar el ingreso diario" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ingreso = await this.ingresoDiarioRepository.findOneBy({
        id: Number(id),
      });

      if (!ingreso) {
        res.status(404).json({ message: "Ingreso diario no encontrado" });
      } else {
        await this.ingresoDiarioRepository.remove(ingreso);
        res.status(204).send(); // No content
      }
    } catch (error) {
      console.error("Error al eliminar el ingreso diario:", error);
      res.status(500).json({ message: "Error al eliminar el ingreso diario" });
    }
  }
}

export default new IngresoDiarioController();
