import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);
    return res.status(401).json({ error: "No autorizado" });
  }
};

export const requireRole = (...roleIds: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!roleIds.includes(req.user.roleId)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};
