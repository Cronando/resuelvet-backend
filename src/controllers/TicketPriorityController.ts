import { Request, Response } from "express";
import { TicketPriorityService } from "../services/TicketPriorityService";

const priorityService = new TicketPriorityService();

export class TicketPriorityController {
  getAll = async (req: Request, res: Response) => {
    try {
      const priorities = await priorityService.getAllSorted();
      return res.json(priorities);
    } catch (error) {
      console.error("Error al obtener prioridades:", error);
      return res.status(500).json({ error: "Error al obtener prioridades" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const priority = await priorityService.getById(Number(id as string));

      if (!priority) {
        return res.status(404).json({ error: "Prioridad no encontrada" });
      }

      return res.json(priority);
    } catch (error) {
      console.error("Error al obtener prioridad:", error);
      return res.status(500).json({ error: "Error al obtener prioridad" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const priority = await priorityService.create(req.body);
      return res.status(201).json(priority);
    } catch (error) {
      console.error("Error al crear prioridad:", error);
      return res.status(400).json({ error: "Error al crear prioridad" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const priority = await priorityService.update(Number(id as string), req.body);

      if (!priority) {
        return res.status(404).json({ error: "Prioridad no encontrada" });
      }

      return res.json(priority);
    } catch (error) {
      console.error("Error al actualizar prioridad:", error);
      return res.status(400).json({ error: "Error al actualizar prioridad" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await priorityService.delete(Number(id as string));

      if (!deleted) {
        return res.status(404).json({ error: "Prioridad no encontrada" });
      }

      return res.json({ message: "Prioridad eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar prioridad:", error);
      return res.status(500).json({ error: "Error al eliminar prioridad" });
    }
  };
}
