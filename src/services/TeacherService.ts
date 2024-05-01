import { TeacherRepository } from '../data/repositories';
import { Teacher, TeacherProps } from '../domain';

export class TeacherService {
  #teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.#teacherRepository = teacherRepository;
  }

  async listAll() {
    return this.#teacherRepository.listAll();
  }

  async findById(id: string) {
    const teacher: Teacher | null = await this.#teacherRepository.findById(id);
    if (!teacher) throw new Error('Teacher not found');
    return teacher;
  }

  async create(teacherObject: TeacherProps) {
    const teacher: Teacher = new Teacher(teacherObject);
    const existingTeacher = await this.#teacherRepository.findBy(
      'name',
      teacher.name
    );
    if (existingTeacher) throw new Error('Teacher already exists');
    return this.#teacherRepository.save(teacher);
  }

  async update(searchId: string, updateValue: Partial<TeacherProps>) {
    const existingTeacher = await this.findById(searchId);
    delete updateValue.id;
    const teacher = new Teacher({ ...existingTeacher.object, ...updateValue });
    return this.#teacherRepository.save(teacher);
  }

  async remove(id: string) {
    await this.#teacherRepository.remove(id);
  }
}
