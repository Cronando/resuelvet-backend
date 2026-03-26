import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { TicketStatus } from "./TicketStatus";
import { TicketPriority } from "./TicketPriority";
import { TicketCategory } from "./TicketCategory";
import { TicketComment } from "./TicketComment";
import { TicketHistory } from "./TicketHistory";

@Entity({ name: "tickets", schema: "public" })
export class Ticket {
  @PrimaryColumn("uuid", { name: "idTicket" })
  idTicket!: string;

  @Column("varchar", { name: "ticketNo", length: 20, unique: true })
  ticketNo!: string;

  @Column("varchar", { name: "title", length: 150 })
  title!: string;

  @Column("text", { name: "description" })
  description!: string;

  @CreateDateColumn({
    name: "dateCreated",
    type: "timestamp",
    default: () => "now()",
  })
  dateCreated!: Date;

  @UpdateDateColumn({
    name: "dateUpdated",
    type: "timestamp",
    default: () => "now()",
  })
  dateUpdated!: Date;

  @Column("timestamp", { name: "dateResolved", nullable: true })
  dateResolved?: Date;

  @Column("timestamp", { name: "dateClosed", nullable: true })
  dateClosed?: Date;

  @Column("smallint", { name: "idTicketStat" })
  idTicketStat!: number;

  @Column("smallint", { name: "idTicketPrio" })
  idTicketPrio!: number;

  @Column("smallint", { name: "idTicketCat" })
  idTicketCat!: number;

  @Column("uuid", { name: "idUserReq" })
  idUserReq!: string;

  @Column("uuid", { name: "idUserAsig", nullable: true })
  idUserAsig?: string;

  @ManyToOne(() => User, (user) => user.ticketsRequested, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idUserReq" })
  userRequested!: User;

  @ManyToOne(() => User, (user) => user.ticketsAssigned, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "idUserAsig" })
  userAssigned?: User;

  @ManyToOne(() => TicketStatus, (status) => status.tickets, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idTicketStat" })
  status!: TicketStatus;

  @ManyToOne(() => TicketPriority, (priority) => priority.tickets, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idTicketPrio" })
  priority!: TicketPriority;

  @ManyToOne(() => TicketCategory, (category) => category.tickets, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idTicketCat" })
  category!: TicketCategory;

  @OneToMany(() => TicketComment, (comment) => comment.ticket)
  comments!: TicketComment[];

  @OneToMany(() => TicketHistory, (history) => history.ticket)
  history!: TicketHistory[];
}
