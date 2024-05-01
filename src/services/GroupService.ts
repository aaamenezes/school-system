import { GroupRepository } from '../data/repositories';
import { Group, GroupProps } from '../domain';

export class GroupService {
  #groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.#groupRepository = groupRepository;
  }

  async listAll() {
    return this.#groupRepository.listAll();
  }

  async findById(id: string) {
    const group: Group | null = await this.#groupRepository.findById(id);
    if (!group) throw new Error('Group not found');
    return group;
  }

  async create(groupObject: GroupProps) {
    const group: Group = new Group(groupObject);
    const existingGroup = await this.#groupRepository.findBy(
      'studentsIds',
      group.studentsIds
    );
    if (existingGroup) throw new Error('Group already exists');
    return this.#groupRepository.save(group);
  }

  async update(searchId: string, updateValue: Partial<GroupProps>) {
    const existingGroup = await this.findById(searchId);
    delete updateValue.id;
    const group = new Group({ ...existingGroup.object, ...updateValue });
    return this.#groupRepository.save(group);
  }

  async remove(id: string) {
    await this.#groupRepository.remove(id);
  }
}
