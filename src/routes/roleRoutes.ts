import { Router } from "express";
import { RoleController } from "../controllers/RoleController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const roleController = new RoleController();

router.get("/", roleController.getAll);
router.get("/:id", roleController.getById);
router.get("/with-users", authMiddleware, roleController.getAllWithUsers);

router.post("/", authMiddleware, requireRole(1), roleController.create);
router.put("/:id", authMiddleware, requireRole(1), roleController.update);
router.delete("/:id", authMiddleware, requireRole(1), roleController.delete);

export default router;
