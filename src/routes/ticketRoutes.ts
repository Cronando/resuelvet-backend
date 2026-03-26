import { Router } from "express";
import { TicketController } from "../controllers/TicketController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const ticketController = new TicketController();

router.get("/", authMiddleware, ticketController.getAll);
router.get("/:id", authMiddleware, ticketController.getById);
router.post("/", authMiddleware, ticketController.create);
router.put("/:id", authMiddleware, ticketController.update);
router.delete("/:id", authMiddleware, ticketController.delete);
router.get("/user/:userId", authMiddleware, ticketController.getByUser);
router.get("/assignee/:userId", authMiddleware, ticketController.getByAssignee);
router.get("/status/:statusId", authMiddleware, ticketController.getByStatus);

export default router;
