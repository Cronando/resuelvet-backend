import { Request, Response } from "express";
import { TicketHistoryService } from "../services/TicketHistoryService";

const historyService = new TicketHistoryService();

export class TicketHistoryController {
  getAll = async (req: Request, res: Response) => {
    try {
      const history = await historyService.getAll();
      return res.json(history);
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return res.status(500).json({ error: "Error al obtener historial" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await historyService.getHistoryWithDetails(id as string);

      if (!record) {
        return res.status(404).json({ error: "Registro de historial no encontrado" });
      }

      return res.json(record);
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return res.status(500).json({ error: "Error al obtener historial" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const record = await historyService.create(req.body);
      return res.status(201).json(record);
    } catch (error) {
      console.error("Error al crear registro de historial:", error);
      return res.status(400).json({ error: "Error al crear registro" });
    }
  };

  getByTicket = async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      const history = await historyService.getHistoryByTicket(ticketId as string);
      return res.json(history);
    } catch (error) {
      console.error("Error al obtener historial del ticket:", error);
      return res.status(500).json({ error: "Error al obtener historial" });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const history = await historyService.getHistoryByUser(userId as string);
      return res.json(history);
    } catch (error) {
      console.error("Error al obtener historial del usuario:", error);
      return res.status(500).json({ error: "Error al obtener historial" });
    }
  };
}
