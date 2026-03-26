import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

const roleService = new RoleService();

export class RoleController {
  getAll = async (req: Request, res: Response) => {
    try {
      const roles = await roleService.getAll();
      return res.json(roles);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      return res.status(500).json({ error: "Error al obtener roles" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await roleService.getById(Number(id as string));

      if (!role) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      return res.json(role);
    } catch (error) {
      console.error("Error al obtener rol:", error);
      return res.status(500).json({ error: "Error al obtener rol" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const role = await roleService.create(req.body);
      return res.status(201).json(role);
    } catch (error) {
      console.error("Error al crear rol:", error);
      return res.status(400).json({ error: "Error al crear rol" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const role = await roleService.update(Number(id as string), req.body);

      if (!role) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      return res.json(role);
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      return res.status(400).json({ error: "Error al actualizar rol" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await roleService.delete(Number(id as string));

      if (!deleted) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      return res.json({ message: "Rol eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar rol:", error);
      return res.status(500).json({ error: "Error al eliminar rol" });
    }
  };

  getAllWithUsers = async (req: Request, res: Response) => {
    try {
      const roles = await roleService.getAllWithUsers();
      return res.json(roles);
    } catch (error) {
      console.error("Error al obtener roles con usuarios:", error);
      return res.status(500).json({ error: "Error al obtener roles" });
    }
  };
}
