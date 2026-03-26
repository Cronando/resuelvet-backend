import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { TicketHistory } from "./TicketHistory";

@Entity({ name: "ticketStatus", schema: "public" })
export class TicketStatus {
  @PrimaryColumn("smallint", { name: "idTicketStat" })
  idTicketStat!: number;

  @Column("varchar", { name: "code", length: 30, unique: true })
  code!: string;

  @Column("varchar", { name: "name", length: 50 })
  name!: string;

  @Column("smallint", { name: "sort", default: 0 })
  sort!: number;

  @Column("boolean", { name: "final", default: false })
  final!: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.status)
  tickets!: Ticket[];

  @OneToMany(() => TicketHistory, (history) => history.newStatus)
  newStatuses!: TicketHistory[];

  @OneToMany(() => TicketHistory, (history) => history.currentStatus)
  currentStatuses!: TicketHistory[];
}
