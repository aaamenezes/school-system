import { Student, StudentProps } from '../../domain';
import { DB } from '../db';

export class StudentRepository {
  #DB: DB;

  constructor(database: DB) {
    this.#DB = database;
  }

  async listAll(): Promise<Student[]> {
    const students = await this.#DB.listStudents();
    return students.map(student => new Student(student));
  }

  async findById(id: string): Promise<Student | null> {
    const student = await this.#DB.getStudent(id);
    if (!student) return null;
    return new Student(student);
  }

  async findBy(property: keyof Omit<StudentProps, 'id'>, value: any) {
    const students = await this.#DB.listStudents();
    const student = students.find(student => student[property] === value);

    if (!student) return null;
    return new Student(student);
  }

  async remove(id: string) {
    return this.#DB.deleteStudent(id);
  }

  async save(student: Student) {
    const studentObject: StudentProps = student.object;

    if (await this.findById(student.id)) {
      return this.#DB.updateStudent(student.id, studentObject);
    }

    return this.#DB.addStudent(studentObject);
  }
}
