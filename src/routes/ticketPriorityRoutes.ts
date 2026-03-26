import { Router } from "express";
import { TicketPriorityController } from "../controllers/TicketPriorityController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const priorityController = new TicketPriorityController();

router.get("/", priorityController.getAll);
router.get("/:id", priorityController.getById);

router.post("/", authMiddleware, requireRole(1), priorityController.create);
router.put("/:id", authMiddleware, requireRole(1), priorityController.update);
router.delete("/:id", authMiddleware, requireRole(1), priorityController.delete);

export default router;
