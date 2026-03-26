import { AppDataSource } from "../config/data-source";
import { TicketCategory } from "../entities/TicketCategory";
import { BaseService } from "./BaseService";

export class TicketCategoryService extends BaseService<TicketCategory> {
  constructor() {
    super(AppDataSource.getRepository(TicketCategory));
  }

  async getCategoryByName(name: string): Promise<TicketCategory | null> {
    return this.repository.findOneBy({ name });
  }

  async getAllWithTickets(): Promise<TicketCategory[]> {
    return this.repository.find({
      relations: ["tickets"],
    });
  }
}
