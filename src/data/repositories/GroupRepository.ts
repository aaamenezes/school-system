import { Group, GroupProps } from '../../domain';
import { DB } from '../db';

export class GroupRepository {
  #DB: DB;

  constructor(database: DB) {
    this.#DB = database;
  }

  async listAll(): Promise<Group[]> {
    const groups = await this.#DB.listGroups();
    return groups.map(group => new Group(group));
  }

  async findById(id: string): Promise<Group | null> {
    const group = await this.#DB.getGroup(id);
    if (!group) return null;
    return new Group(group);
  }

  async findBy(property: keyof Omit<GroupProps, 'id'>, value: any) {
    const groups = await this.#DB.listGroups();
    const group = groups.find(group => group[property] === value);

    if (!group) return null;
    return new Group(group);
  }

  async remove(id: string) {
    return this.#DB.deleteGroup(id);
  }

  async save(group: Group) {
    const groupObject: GroupProps = group.object;

    if (await this.findById(group.id)) {
      return this.#DB.updateGroup(group.id, groupObject);
    }

    return this.#DB.addGroup(groupObject);
  }
}
