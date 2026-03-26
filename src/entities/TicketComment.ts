import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./User";

@Entity({ name: "ticketComments", schema: "public" })
export class TicketComment {
  @PrimaryColumn("uuid", { name: "idTicketComm" })
  idTicketComm!: string;

  @Column("text", { name: "comment" })
  comment!: string;

  @Column("boolean", { name: "internal", default: false })
  internal!: boolean;

  @CreateDateColumn({
    name: "dateCreated",
    type: "timestamp",
    default: () => "now()",
  })
  dateCreated!: Date;

  @Column("uuid", { name: "idTicket" })
  idTicket!: string;

  @Column("uuid", { name: "idUser" })
  idUser!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idTicket" })
  ticket!: Ticket;

  @ManyToOne(() => User, (user) => user.ticketComments, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idUser" })
  user!: User;
}
