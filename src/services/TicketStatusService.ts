import { AppDataSource } from "../config/data-source";
import { TicketStatus } from "../entities/TicketStatus";
import { BaseService } from "./BaseService";

export class TicketStatusService extends BaseService<TicketStatus> {
  constructor() {
    super(AppDataSource.getRepository(TicketStatus));
  }

  async getStatusByCode(code: string): Promise<TicketStatus | null> {
    return this.repository.findOneBy({ code });
  }

  async getAllWithTickets(): Promise<TicketStatus[]> {
    return this.repository.find({
      relations: ["tickets"],
    });
  }

  async getFinalStatuses(): Promise<TicketStatus[]> {
    return this.repository.find({
      where: { final: true },
    });
  }

  async getActiveStatuses(): Promise<TicketStatus[]> {
    return this.repository.find({
      where: { final: false },
    });
  }
}
