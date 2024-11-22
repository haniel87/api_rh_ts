import { Request, Response } from "express";

class RangoEnviosController {
  constructor() {}

  consultar(req: Request, res: Response) {
    try {
      res.send("consultar");
    } catch (err) {
      if (err instanceof Error) res.status(500).send(err.message);
    }
  }

  consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      res.send("consultar detalles");
    } catch (err) {
      if (err instanceof Error) res.status(500).send(err.message);
    }
  }

  insertar(req: Request, res: Response) {
    try {
        res.send("Insertar");
      } catch (err) {
        if (err instanceof Error) res.status(500).send(err.message);
      }
  }

  actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
        res.send("Actualizar");
      } catch (err) {
        if (err instanceof Error) res.status(500).send(err.message);
      }
  }

  eliminar(req: Request, res: Response) {
    const { id } = req.params;
    try {
        res.send("Eliminar");
      } catch (err) {
        if (err instanceof Error) res.status(500).send(err.message);
      }
  }
}

export default new RangoEnviosController();