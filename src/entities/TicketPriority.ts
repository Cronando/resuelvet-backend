import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";

@Entity({ name: "ticketPriorities", schema: "public" })
export class TicketPriority {
  @PrimaryColumn("smallint", { name: "idTicketPrio" })
  idTicketPrio!: number;

  @Column("varchar", { name: "code", length: 30, unique: true })
  code!: string;

  @Column("varchar", { name: "name", length: 50 })
  name!: string;

  @Column("smallint", { name: "sort", default: 0 })
  sort!: number;

  @OneToMany(() => Ticket, (ticket) => ticket.priority)
  tickets!: Ticket[];
}
