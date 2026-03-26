import { AppDataSource } from "../config/data-source";
import { TicketPriority } from "../entities/TicketPriority";
import { BaseService } from "./BaseService";

export class TicketPriorityService extends BaseService<TicketPriority> {
  constructor() {
    super(AppDataSource.getRepository(TicketPriority));
  }

  async getPriorityByCode(code: string): Promise<TicketPriority | null> {
    return this.repository.findOneBy({ code });
  }

  async getAllSorted(): Promise<TicketPriority[]> {
    return this.repository.find({
      order: { sort: "ASC" },
    });
  }
}
