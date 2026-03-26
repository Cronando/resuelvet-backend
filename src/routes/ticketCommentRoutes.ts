import { Router } from "express";
import { TicketCommentController } from "../controllers/TicketCommentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const commentController = new TicketCommentController();

router.get("/", authMiddleware, commentController.getAll);
router.get("/:id", authMiddleware, commentController.getById);
router.post("/", authMiddleware, commentController.create);
router.put("/:id", authMiddleware, commentController.update);
router.delete("/:id", authMiddleware, commentController.delete);
router.get("/ticket/:ticketId", authMiddleware, commentController.getByTicket);
router.get("/ticket/:ticketId/public", authMiddleware, commentController.getPublicByTicket);
router.get("/user/:userId", authMiddleware, commentController.getByUser);

export default router;
