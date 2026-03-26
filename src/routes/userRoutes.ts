import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.get("/", authMiddleware, userController.getAll);
router.get("/:id", authMiddleware, userController.getById);
router.post("/", authMiddleware, requireRole(1), userController.create); // Admin only
router.put("/:id", authMiddleware, userController.update);
router.delete("/:id", authMiddleware, requireRole(1), userController.delete); // Admin only
router.get("/email/:email", authMiddleware, userController.getByEmail);

export default router;
