import { AppDataSource } from "../config/data-source";
import { TicketHistory } from "../entities/TicketHistory";
import { BaseService } from "./BaseService";

export class TicketHistoryService extends BaseService<TicketHistory> {
  constructor() {
    super(AppDataSource.getRepository(TicketHistory));
  }

  async getHistoryByTicket(ticketId: string): Promise<TicketHistory[]> {
    return this.repository.find({
      where: { idTicket: ticketId },
      relations: ["currentStatus", "newStatus", "user"],
      order: { dateChanged: "DESC" },
    });
  }

  async getHistoryByUser(userId: string): Promise<TicketHistory[]> {
    return this.repository.find({
      where: { userChanged: userId },
      relations: ["ticket", "currentStatus", "newStatus"],
      order: { dateChanged: "DESC" },
    });
  }

  async getHistoryWithDetails(id: string): Promise<TicketHistory | null> {
    return this.repository.findOne({
      where: { idTicketHist: id },
      relations: ["ticket", "currentStatus", "newStatus", "user"],
    });
  }
}
