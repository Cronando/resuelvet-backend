import { AppDataSource } from "../config/data-source";
import { Ticket } from "../entities/Ticket";
import { BaseService } from "./BaseService";

export class TicketService extends BaseService<Ticket> {
  constructor() {
    super(AppDataSource.getRepository(Ticket));
  }

  async getTicketWithDetails(id: string): Promise<Ticket | null> {
    return this.repository.findOne({
      where: { idTicket: id },
      relations: [
        "status",
        "priority",
        "category",
        "userRequested",
        "userAssigned",
        "comments",
        "history",
      ],
    });
  }

  async getTicketsByUser(userId: string): Promise<Ticket[]> {
    return this.repository.find({
      where: { idUserReq: userId },
      relations: ["status", "priority", "category"],
    });
  }

  async getTicketsByAssignee(userId: string): Promise<Ticket[]> {
    return this.repository.find({
      where: { idUserAsig: userId },
      relations: ["status", "priority", "category"],
    });
  }

  async getTicketsByStatus(statusId: number): Promise<Ticket[]> {
    return this.repository.find({
      where: { idTicketStat: statusId },
      relations: ["userRequested", "userAssigned", "priority", "category"],
    });
  }

  async getAllWithRelations(): Promise<Ticket[]> {
    return this.repository.find({
      relations: [
        "status",
        "priority",
        "category",
        "userRequested",
        "userAssigned",
      ],
    });
  }
}
