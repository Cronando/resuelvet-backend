import { Request, Response } from "express";
import { TicketCommentService } from "../services/TicketCommentService";

const commentService = new TicketCommentService();

export class TicketCommentController {
  getAll = async (req: Request, res: Response) => {
    try {
      const comments = await commentService.getAll();
      return res.json(comments);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await commentService.getCommentWithDetails(id as string);

      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      return res.json(comment);
    } catch (error) {
      console.error("Error al obtener comentario:", error);
      return res.status(500).json({ error: "Error al obtener comentario" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const comment = await commentService.create(req.body);
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Error al crear comentario:", error);
      return res.status(400).json({ error: "Error al crear comentario" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await commentService.update(id as string, req.body);

      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      return res.json(comment);
    } catch (error) {
      console.error("Error al actualizar comentario:", error);
      return res.status(400).json({ error: "Error al actualizar comentario" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await commentService.delete(id as string);

      if (!deleted) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      return res.json({ message: "Comentario eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      return res.status(500).json({ error: "Error al eliminar comentario" });
    }
  };

  getByTicket = async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      const comments = await commentService.getCommentsByTicket(ticketId as string);
      return res.json(comments);
    } catch (error) {
      console.error("Error al obtener comentarios del ticket:", error);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }
  };

  getPublicByTicket = async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      const comments = await commentService.getPublicCommentsByTicket(ticketId as string);
      return res.json(comments);
    } catch (error) {
      console.error("Error al obtener comentarios públicos:", error);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const comments = await commentService.getCommentsByUser(userId as string);
      return res.json(comments);
    } catch (error) {
      console.error("Error al obtener comentarios del usuario:", error);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }
  };
}
