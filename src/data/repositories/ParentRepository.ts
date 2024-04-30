import { Parent, ParentProps } from '../../domain';
import { DB } from '../db';

export class ParentRepository {
  #DB: DB;

  constructor(database: DB) {
    this.#DB = database;
  }

  async listAll(): Promise<Parent[]> {
    const parents = await this.#DB.listParents();
    return parents.map(parent => new Parent(parent));
  }

  async findById(id: string): Promise<Parent | null> {
    const parent = await this.#DB.getParent(id);
    if (!parent) return null;
    return new Parent(parent);
  }

  async findBy(property: keyof Omit<ParentProps, 'id'>, value: any) {
    const parents = await this.#DB.listParents();
    const parent = parents.find(parent => parent[property] === value);

    if (!parent) return null;
    return new Parent(parent);
  }

  async remove(id: string) {
    return this.#DB.deleteParent(id);
  }

  async save(parent: Parent) {
    const parentObject: ParentProps = parent.object;

    if (await this.findById(parent.id)) {
      return this.#DB.updateParent(parent.id, parentObject);
    }

    return this.#DB.addParent(parentObject);
  }
}
