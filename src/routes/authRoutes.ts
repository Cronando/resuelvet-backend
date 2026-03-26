import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

router.get("/me", authMiddleware, authController.me);

export default router;
