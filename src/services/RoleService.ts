import { AppDataSource } from "../config/data-source";
import { Role } from "../entities/Role";
import { BaseService } from "./BaseService";

export class RoleService extends BaseService<Role> {
  constructor() {
    super(AppDataSource.getRepository(Role));
  }

  async getRoleByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name });
  }

  async getAllWithUsers(): Promise<Role[]> {
    return this.repository.find({
      relations: ["users"],
    });
  }
}
