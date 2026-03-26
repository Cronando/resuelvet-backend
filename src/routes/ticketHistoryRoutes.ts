import { Router } from "express";
import { TicketHistoryController } from "../controllers/TicketHistoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const historyController = new TicketHistoryController();

router.get("/", authMiddleware, historyController.getAll);
router.get("/:id", authMiddleware, historyController.getById);
router.post("/", authMiddleware, historyController.create);
router.get("/ticket/:ticketId", authMiddleware, historyController.getByTicket);
router.get("/user/:userId", authMiddleware, historyController.getByUser);

export default router;
