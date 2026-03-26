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
import { Role } from "./Role";
import { Ticket } from "./Ticket";
import { TicketComment } from "./TicketComment";
import { TicketHistory } from "./TicketHistory";

@Entity({ name: "users", schema: "public" })
export class User {
  @PrimaryColumn("uuid", { name: "idUser" })
  idUser!: string;

  @Column("varchar", { name: "firstName", length: 100 })
  firstName!: string;

  @Column("varchar", { name: "lastName", length: 100 })
  lastName!: string;

  @Column("varchar", { name: "email", length: 150, unique: true })
  email!: string;

  @Column("varchar", { name: "username", length: 50, unique: true })
  username!: string;

  @Column("varchar", { name: "passwordHash", length: 255 })
  passwordHash!: string;

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

  @Column("boolean", { name: "active", default: true })
  active!: boolean;

  @Column("smallint", { name: "idRole" })
  idRole!: number;

  @ManyToOne(() => Role, (role) => role.users, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "idRole" })
  role!: Role;

  @OneToMany(() => Ticket, (ticket) => ticket.userRequested)
  ticketsRequested!: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.userAssigned)
  ticketsAssigned!: Ticket[];

  @OneToMany(() => TicketComment, (comment) => comment.user)
  ticketComments!: TicketComment[];

  @OneToMany(() => TicketHistory, (history) => history.user)
  ticketHistoryChanges!: TicketHistory[];
}