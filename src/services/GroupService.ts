import { GroupRepository, StudentRepository } from '../data/repositories';
import { Group, GroupProps, Student } from '../domain';
import { StudentService } from './StudentService';

export class GroupService {
  #groupRepository: GroupRepository;
  #studentRepository: StudentService;

  constructor(
    groupRepository: GroupRepository,
    studentService: StudentService
  ) {
    this.#groupRepository = groupRepository;
    this.#studentRepository = studentService;
  }

  async listAll() {
    return this.#groupRepository.listAll();
  }

  async findById(id: string) {
    const group: Group | null = await this.#groupRepository.findById(id);
    if (!group) throw new Error('Group not found');
    return group;
  }

  async getStudents(group: Group) {
    const students: Student[] = [];

    for (const studentId of group.studentsIds || []) {
      try {
        const student = await this.#studentRepository.findById(studentId);
        if (!student) throw new Error();
        students.push(student);
      } catch (error) {
        console.warn(`Student for the group ${group.id} was not found`);
        continue;
      }
    }
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
