import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { TicketStatus } from "./TicketStatus";
import { User } from "./User";

@Entity({ name: "ticketHistory", schema: "public" })
export class TicketHistory {
  @PrimaryColumn("uuid", { name: "idTicketHist" })
  idTicketHist!: string;

  @Column("varchar", { name: "reason", length: 255, nullable: true })
  reason?: string;

  @CreateDateColumn({
    name: "dateChanged",
    type: "timestamp",
    default: () => "now()",
  })
  dateChanged!: Date;

  @Column("uuid", { name: "idTicket" })
  idTicket!: string;

  @Column("smallint", { name: "currentIdTicketStat", nullable: true })
  currentIdTicketStat?: number;

  @Column("smallint", { name: "newIdTicketStat" })
  newIdTicketStat!: number;

  @Column("uuid", { name: "userChanged" })
  userChanged!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.history, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idTicket" })
  ticket!: Ticket;

  @ManyToOne(() => TicketStatus, (status) => status.currentStatuses, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    nullable: true,
  })
  @JoinColumn({ name: "currentIdTicketStat" })
  currentStatus?: TicketStatus;

  @ManyToOne(() => TicketStatus, (status) => status.newStatuses, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "newIdTicketStat" })
  newStatus!: TicketStatus;

  @ManyToOne(() => User, (user) => user.ticketHistoryChanges, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "userChanged" })
  user!: User;
}
