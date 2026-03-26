import { AppDataSource } from "../config/data-source";
import { Ticket } from "../entities/Ticket";
import { TicketComment } from "../entities/TicketComment";
import { TicketHistory } from "../entities/TicketHistory";
import { User } from "../entities/User";
import { BaseService } from "./BaseService";

export interface DeleteUserResult {
  found: boolean;
  hardDeleted: boolean;
  deactivated: boolean;
}

export class UserService extends BaseService<User> {
  private readonly ticketRepository = AppDataSource.getRepository(Ticket);
  private readonly ticketCommentRepository = AppDataSource.getRepository(TicketComment);
  private readonly ticketHistoryRepository = AppDataSource.getRepository(TicketHistory);

  constructor() {
    super(AppDataSource.getRepository(User));
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.repository.findOneBy({ username });
  }

  async getUsersWithRole(): Promise<User[]> {
    return this.repository.find({
      relations: ["role"],
    });
  }

  async getUserWithTickets(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { idUser: id },
      relations: ["ticketsRequested", "ticketsAssigned", "role"],
    });
  }

  async deleteOrDeactivate(id: string): Promise<DeleteUserResult> {
    const user = await this.repository.findOneBy({ idUser: id });

    if (!user) {
      return {
        found: false,
        hardDeleted: false,
        deactivated: false,
      };
    }

    const [requestedTickets, ticketComments, ticketHistoryChanges] = await Promise.all([
      this.ticketRepository.countBy({ idUserReq: id }),
      this.ticketCommentRepository.countBy({ idUser: id }),
      this.ticketHistoryRepository.countBy({ userChanged: id }),
    ]);

    const hasBlockingRelations =
      requestedTickets > 0 || ticketComments > 0 || ticketHistoryChanges > 0;

    if (!hasBlockingRelations) {
      const deleted = await this.repository.delete(id);
      return {
        found: true,
        hardDeleted: (deleted.affected ?? 0) > 0,
        deactivated: false,
      };
    }

    await this.ticketRepository
      .createQueryBuilder()
      .update(Ticket)
      .set({ idUserAsig: () => "NULL" })
      .where('idUserAsig = :id', { id })
      .execute();

    await this.repository.update(id, { active: false });

    return {
      found: true,
      hardDeleted: false,
      deactivated: true,
    };
  }
}