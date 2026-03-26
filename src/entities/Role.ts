import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: "roles", schema: "public" })
export class Role {
  @PrimaryColumn("smallint", { name: "idRole" })
  idRole!: number;

  @Column("varchar", { name: "name", length: 50, unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}