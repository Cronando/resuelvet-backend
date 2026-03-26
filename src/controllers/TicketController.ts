import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";

const ticketService = new TicketService();

export class TicketController {
  getAll = async (req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getAllWithRelations();
      return res.json(tickets);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
      return res.status(500).json({ error: "Error al obtener tickets" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await ticketService.getTicketWithDetails(id as string);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      return res.json(ticket);
    } catch (error) {
      console.error("Error al obtener ticket:", error);
      return res.status(500).json({ error: "Error al obtener ticket" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const ticket = await ticketService.create(req.body);
      return res.status(201).json(ticket);
    } catch (error) {
      console.error("Error al crear ticket:", error);
      return res.status(400).json({ error: "Error al crear ticket" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await ticketService.update(id as string, req.body);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      return res.json(ticket);
    } catch (error) {
      console.error("Error al actualizar ticket:", error);
      return res.status(400).json({ error: "Error al actualizar ticket" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await ticketService.delete(id as string);

      if (!deleted) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      return res.json({ message: "Ticket eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar ticket:", error);
      return res.status(500).json({ error: "Error al eliminar ticket" });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const tickets = await ticketService.getTicketsByUser(userId as string);
      return res.json(tickets);
    } catch (error) {
      console.error("Error al obtener tickets del usuario:", error);
      return res.status(500).json({ error: "Error al obtener tickets" });
    }
  };

  getByAssignee = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const tickets = await ticketService.getTicketsByAssignee(userId as string);
      return res.json(tickets);
    } catch (error) {
      console.error("Error al obtener tickets asignados:", error);
      return res.status(500).json({ error: "Error al obtener tickets" });
    }
  };

  getByStatus = async (req: Request, res: Response) => {
    try {
      const { statusId } = req.params;
      const tickets = await ticketService.getTicketsByStatus(Number(statusId));
      return res.json(tickets);
    } catch (error) {
      console.error("Error al obtener tickets por estatus:", error);
      return res.status(500).json({ error: "Error al obtener tickets" });
    }
  };
}
