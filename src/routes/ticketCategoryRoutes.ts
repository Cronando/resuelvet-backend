import { Router } from "express";
import { TicketCategoryController } from "../controllers/TicketCategoryController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const categoryController = new TicketCategoryController();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.get("/with-tickets", categoryController.getWithTickets);

router.post("/", authMiddleware, requireRole(1), categoryController.create);
router.put("/:id", authMiddleware, requireRole(1), categoryController.update);
router.delete("/:id", authMiddleware, requireRole(1), categoryController.delete);

export default router;
