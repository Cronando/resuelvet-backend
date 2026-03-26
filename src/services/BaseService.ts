import { Repository } from "typeorm";

export abstract class BaseService<T extends object> {
  constructor(protected repository: Repository<T>) {}

  private getPrimaryColumnName(): string {
    const primaryColumn = this.repository.metadata.primaryColumns[0];
    if (!primaryColumn) {
      throw new Error(`Entidad sin llave primaria: ${this.repository.metadata.name}`);
    }

    return primaryColumn.propertyName;
  }

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async getById(id: string | number): Promise<T | null> {
    const primaryKey = this.getPrimaryColumnName();
    return this.repository.findOne({
      where: { [primaryKey]: id } as any,
    });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.save(data as T);
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.getById(id);
  }

  async delete(id: string | number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
