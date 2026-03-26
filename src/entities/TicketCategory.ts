import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity({ name: "ticketCategories", schema: "public" })
export class TicketCategory {
  @PrimaryColumn("smallint", { name: "idTicketCat" })
  idTicketCat!: number;

  @Column("varchar", { name: "name", length: 100, unique: true })
  name!: string;

  @Column("varchar", { name: "description", length: 255, nullable: true })
  description?: string;

  @CreateDateColumn({
    name: "dateCreated",
    type: "timestamp",
    default: () => "now()",
  })
  dateCreated!: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.category)
  tickets!: Ticket[];
}
