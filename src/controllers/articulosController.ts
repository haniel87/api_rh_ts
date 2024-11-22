import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Articulo } from "../models/articulosModel";

class ArticulosController {
  private articuloRepository = AppDataSource.getRepository(Articulo);

  async create(req: Request, res: Response) {
    try {
      const {
        nombre,
        descripcion,
        costo,
        precio_minimo,
        cantidad_disponible,
        image,
      } = req.body;
      if (
        !nombre ||
        !descripcion ||
        costo < 0 ||
        precio_minimo < 0 ||
        cantidad_disponible < 0
      ) {
        res
          .status(400)
          .json({ message: "Los datos del artículo son inválidos" });
      }
      const nuevoArticulo = this.articuloRepository.create({
        nombre,
        descripcion,
        costo,
        precio_minimo,
        cantidad_disponible,
        createAt: new Date(),
        updateAt: new Date(),
        image
    });

    await this.articuloRepository.save(nuevoArticulo);
    res.status(201).json(nuevoArticulo);
    } catch (err) {
      console.error("Error al crear el artículo:", err);
      res.status(500).json({ message: "Error al crear el artículo" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const articulos = await this.articuloRepository.find();
      res.status(200).json(articulos);
    } catch (err) {
      if (err instanceof Error) res.status(500).send(err.message);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const articulo = await this.articuloRepository.findOneBy({
        id: Number(id),
      });
      if (!articulo) {
        res.status(404).json({ message: "Artículo no encontrado" });
      } else {
        res.status(200).json(articulo);
      }
    } catch (err) {
      console.error("Error al obtener el artículo", err);
      res.status(500).json({ message: "Error al obtener el artículo" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const {
        nombre,
        descripcion,
        costo,
        precio_minimo,
        cantidad_disponible,
        image,
      } = req.body;

      const articulo = await this.articuloRepository.findOneBy({
        id: Number(id),
      });

      if (!articulo) {
        res.status(404).json({ message: "Artículo no encontrado" });
      } else {
        articulo.nombre = nombre;
        articulo.descripcion = descripcion;
        articulo.costo = costo;
        articulo.precio_minimo = precio_minimo;
        articulo.cantidad_disponible = cantidad_disponible;
        articulo.image = image;

        await this.articuloRepository.save(articulo);
        res.status(201).json(articulo);
      }
    } catch (err) {
      console.error("Error al actualizar el artículo:", err);
      if (err instanceof Error) res.status(500).send(err.message);
      res.status(500).json({ message: "Error al actualizar el artículo" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const articulo = await this.articuloRepository.findOneBy({
        id: Number(id),
      });

      if (!articulo) {
        res.status(404).json({ message: "Artículo no encontrado" });
      } else {
        await this.articuloRepository.remove(articulo);
        res.status(204).send();
      }
    } catch (err) {
      if (err instanceof Error) res.status(500).send(err.message);
    }
  }
}

export default new ArticulosController();
