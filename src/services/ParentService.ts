import { ParentRepository } from '../data/repositories';
import { Parent, ParentProps } from '../domain';

export class ParentService {
  #parentRepository: ParentRepository;

  constructor(parentRepository: ParentRepository) {
    this.#parentRepository = parentRepository;
  }

  async listAll() {
    return this.#parentRepository.listAll();
  }

  async findById(id: string) {
    const parent: Parent | null = await this.#parentRepository.findById(id);
    if (!parent) throw new Error('Parent not found');
    return parent;
  }

  async create(parentObject: ParentProps) {
    const parent: Parent = new Parent(parentObject);
    const existingParent = await this.#parentRepository.findBy(
      'studentsIds',
      parent.studentsIds
    );
    if (existingParent) throw new Error('Parent already exists');
    return this.#parentRepository.save(parent);
  }

  async update(searchId: string, updateValue: Partial<ParentProps>) {
    const existingParent = await this.findById(searchId);
    delete updateValue.id;
    const parent = new Parent({ ...existingParent.object, ...updateValue });
    return this.#parentRepository.save(parent);
  }

  async remove(id: string) {
    await this.#parentRepository.remove(id);
  }
}
