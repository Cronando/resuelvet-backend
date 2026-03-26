import { Request, Response } from "express";
import { TicketStatusService } from "../services/TicketStatusService";

const statusService = new TicketStatusService();

export class TicketStatusController {
  getAll = async (req: Request, res: Response) => {
    try {
      const statuses = await statusService.getAll();
      return res.json(statuses);
    } catch (error) {
      console.error("Error al obtener estados:", error);
      return res.status(500).json({ error: "Error al obtener estados" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const status = await statusService.getById(Number(id as string));

      if (!status) {
        return res.status(404).json({ error: "Estado no encontrado" });
      }

      return res.json(status);
    } catch (error) {
      console.error("Error al obtener estado:", error);
      return res.status(500).json({ error: "Error al obtener estado" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const status = await statusService.create(req.body);
      return res.status(201).json(status);
    } catch (error) {
      console.error("Error al crear estado:", error);
      return res.status(400).json({ error: "Error al crear estado" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const status = await statusService.update(Number(id as string), req.body);

      if (!status) {
        return res.status(404).json({ error: "Estado no encontrado" });
      }

      return res.json(status);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      return res.status(400).json({ error: "Error al actualizar estado" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await statusService.delete(Number(id as string));

      if (!deleted) {
        return res.status(404).json({ error: "Estado no encontrado" });
      }

      return res.json({ message: "Estado eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar estado:", error);
      return res.status(500).json({ error: "Error al eliminar estado" });
    }
  };

  getFinalStatuses = async (req: Request, res: Response) => {
    try {
      const statuses = await statusService.getFinalStatuses();
      return res.json(statuses);
    } catch (error) {
      console.error("Error al obtener estados finales:", error);
      return res.status(500).json({ error: "Error al obtener estados" });
    }
  };

  getActiveStatuses = async (req: Request, res: Response) => {
    try {
      const statuses = await statusService.getActiveStatuses();
      return res.json(statuses);
    } catch (error) {
      console.error("Error al obtener estados activos:", error);
      return res.status(500).json({ error: "Error al obtener estados" });
    }
  };
}
