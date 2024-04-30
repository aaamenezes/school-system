import { Teacher, TeacherProps } from '../../domain';
import { DB } from '../db';

export class TeacherRepository {
  #DB: DB;

  constructor(database: DB) {
    this.#DB = database;
  }

  async listAll(): Promise<Teacher[]> {
    const teachers = await this.#DB.listTeachers();
    return teachers.map(teacher => new Teacher(teacher));
  }

  async findById(id: string): Promise<Teacher | null> {
    const teacher = await this.#DB.getTeacher(id);
    if (!teacher) return null;
    return new Teacher(teacher);
  }

  async findBy(property: keyof Omit<TeacherProps, 'id'>, value: any) {
    const teachers = await this.#DB.listTeachers();
    const teacher = teachers.find(teacher => teacher[property] === value);

    if (!teacher) return null;
    return new Teacher(teacher);
  }

  async remove(id: string) {
    return this.#DB.deleteTeacher(id);
  }

  async save(teacher: Teacher) {
    const teacherObject: TeacherProps = teacher.object;

    if (await this.findById(teacher.id)) {
      return this.#DB.updateTeacher(teacher.id, teacherObject);
    }

    return this.#DB.addTeacher(teacherObject);
  }
}
