import { Request, Response } from "express";
import { TicketCategoryService } from "../services/TicketCategoryService";

const categoryService = new TicketCategoryService();

export class TicketCategoryController {
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAll();
      return res.json(categories);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      return res.status(500).json({ error: "Error al obtener categorías" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await categoryService.getById(Number(id as string));

      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      return res.json(category);
    } catch (error) {
      console.error("Error al obtener categoría:", error);
      return res.status(500).json({ error: "Error al obtener categoría" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const category = await categoryService.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      return res.status(400).json({ error: "Error al crear categoría" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await categoryService.update(Number(id as string), req.body);

      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      return res.json(category);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      return res.status(400).json({ error: "Error al actualizar categoría" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await categoryService.delete(Number(id as string));

      if (!deleted) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      return res.json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      return res.status(500).json({ error: "Error al eliminar categoría" });
    }
  };

  getWithTickets = async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAllWithTickets();
      return res.json(categories);
    } catch (error) {
      console.error("Error al obtener categorías con tickets:", error);
      return res.status(500).json({ error: "Error al obtener categorías" });
    }
  };
}
