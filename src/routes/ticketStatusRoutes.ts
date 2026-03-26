import { Router } from "express";
import { TicketStatusController } from "../controllers/TicketStatusController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const statusController = new TicketStatusController();

router.get("/", statusController.getAll);
router.get("/:id", statusController.getById);
router.get("/statuses/final", statusController.getFinalStatuses);
router.get("/statuses/active", statusController.getActiveStatuses);

router.post("/", authMiddleware, requireRole(1), statusController.create);
router.put("/:id", authMiddleware, requireRole(1), statusController.update);
router.delete("/:id", authMiddleware, requireRole(1), statusController.delete);

export default router;
