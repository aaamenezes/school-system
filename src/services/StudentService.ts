import { StudentRepository } from '../data/repositories';
import { Student, StudentProps } from '../domain';

export class StudentService {
  #studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.#studentRepository = studentRepository;
  }

  async listAll() {
    return this.#studentRepository.listAll();
  }

  async findById(id: string) {
    const student: Student | null = await this.#studentRepository.findById(id);
    if (!student) throw new Error('Student not found');
    return student;
  }

  async create(studentObject: StudentProps) {
    const student: Student = new Student(studentObject);
    const existingStudent = await this.#studentRepository.findBy(
      'name',
      student.name
    );
    if (existingStudent) throw new Error('Student already exists');
    return this.#studentRepository.save(student);
  }

  async update(searchId: string, updateValue: Partial<StudentProps>) {
    const existingStudent = await this.findById(searchId);
    delete updateValue.id;
    const student = new Student({ ...existingStudent.object, ...updateValue });
    return this.#studentRepository.save(student);
  }

  async remove(id: string) {
    await this.#studentRepository.remove(id);
  }
}
