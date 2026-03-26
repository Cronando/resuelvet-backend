import { AppDataSource } from "../config/data-source";
import { TicketComment } from "../entities/TicketComment";
import { BaseService } from "./BaseService";

export class TicketCommentService extends BaseService<TicketComment> {
  constructor() {
    super(AppDataSource.getRepository(TicketComment));
  }

  async getCommentsByTicket(ticketId: string): Promise<TicketComment[]> {
    return this.repository.find({
      where: { idTicket: ticketId },
      relations: ["user"],
      order: { dateCreated: "DESC" },
    });
  }

  async getPublicCommentsByTicket(ticketId: string): Promise<TicketComment[]> {
    return this.repository.find({
      where: { idTicket: ticketId, internal: false },
      relations: ["user"],
      order: { dateCreated: "DESC" },
    });
  }

  async getCommentsByUser(userId: string): Promise<TicketComment[]> {
    return this.repository.find({
      where: { idUser: userId },
      relations: ["ticket"],
      order: { dateCreated: "DESC" },
    });
  }

  async getCommentWithDetails(id: string): Promise<TicketComment | null> {
    return this.repository.findOne({
      where: { idTicketComm: id },
      relations: ["user", "ticket"],
    });
  }
}
