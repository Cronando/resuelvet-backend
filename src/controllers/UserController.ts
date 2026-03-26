import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await userService.getUsersWithRole();
      return res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserWithTickets(id as string);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(400).json({ error: "Error al crear usuario" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.update(id as string, req.body);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return res.status(400).json({ error: "Error al actualizar usuario" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await userService.deleteOrDeactivate(id as string);

      if (!result.found) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (result.deactivated) {
        return res.json({
          message:
            "El usuario tiene tickets o historial relacionado. Se desactivo la cuenta y se removieron sus asignaciones activas.",
        });
      }

      return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
  };

  getByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email as string);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error al obtener usuario por correo:", error);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }
  };
}
