import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "../services/UserService";
import { generateToken, generateRefreshToken } from "../utils/jwt";

const userService = new UserService();

export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { email, username, password, firstName, lastName, roleId } = req.body;

      if (!email || !username || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "Campos requeridos faltantes" });
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "El correo ya está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userService.create({
        email,
        username,
        firstName,
        lastName,
        passwordHash: hashedPassword,
        idRole: roleId || 2,
      });
      const token = generateToken({
        id: user.idUser,
        email: user.email,
        roleId: user.idRole,
      });

      const refreshToken = generateRefreshToken(user.idUser);

      return res.status(201).json({
        user: {
          id: user.idUser,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
        refreshToken,
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Correo y contraseña requeridos" });
      }

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      const token = generateToken({
        id: user.idUser,
        email: user.email,
        roleId: user.idRole,
      });

      const refreshToken = generateRefreshToken(user.idUser);

      return res.json({
        user: {
          id: user.idUser,
          email: user.email,
          username: user.username,
          roleId: user.idRole,
        },
        token,
        refreshToken,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: "Token de actualización requerido" });
      }

      const decoded = require("jsonwebtoken").verify(
        refreshToken,
        process.env.JWT_SECRET || "your-secret-key-change-this"
      ) as { id: string };

      const user = await userService.getUserWithTickets(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const newToken = generateToken({
        id: user.idUser,
        email: user.email,
        roleId: user.idRole,
      });

      return res.json({ token: newToken });
    } catch (error) {
      console.error("Error con token de actualización:", error);
      return res.status(401).json({ error: "Token de actualización inválido" });
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "No autenticado" });
      }

      const user = await userService.getUserWithTickets(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json({
        id: user.idUser,
        email: user.email,
        username: user.username,
        roleId: user.idRole,
      });
    } catch (error) {
      console.error("Error al obtener usuario actual:", error);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }
  };
}
