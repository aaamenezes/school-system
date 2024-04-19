import { constants, writeFile } from 'fs';
import { access, readFile } from 'fs/promises';
import path from 'path';
import { Group, Parent, Student, Teacher } from '../domain';

export interface DB {
  students: Student[];
  teachers: Teacher[];
  groups: Group[];
  parents: Parent[];
}

export class DB {
  static instance: DB;

  #students: Map<string, Student> = new Map();
  #teachers: Map<string, Teacher> = new Map();
  #groups: Map<string, Group> = new Map();
  #parents: Map<string, Parent> = new Map();
  #dbPath = path.resolve(__dirname, 'db.json');

  constructor() {
    if (!DB.instance) DB.instance = this;
    return DB.instance;
  }

  async init() {
    try {
      await access(this.#dbPath, constants.F_OK);
      await this.load();
    } catch (error) {
      console.log(`erro ao iniciar o banco de dados:`, error);
      await this.save();
    }
  }

  async save() {
    return await writeFile(
      this.#dbPath,
      JSON.stringify(
        {
          students: [...this.#students.entries()],
          teachers: [...this.#teachers.entries()],
          groups: [...this.#groups.entries()],
          parents: [...this.#parents.entries()]
        },
        null,
        2
      ),
      error => {
        if (error) throw new Error(`Erro ao salvar o db: ${error}`);
        console.log('banco de dados salvo com sucesso!');
      }
    );
  }

  async load() {
    const readData = await readFile(this.#dbPath, 'utf-8');
    this.#students = new Map(
      Array.isArray(JSON.parse(readData).students)
        ? JSON.parse(readData).students
        : new Map()
    );
    this.#teachers = new Map(
      Array.isArray(JSON.parse(readData).teachers)
        ? JSON.parse(readData).teachers
        : new Map()
    );
    this.#groups = new Map(
      Array.isArray(JSON.parse(readData).groups)
        ? JSON.parse(readData).groups
        : new Map()
    );
    this.#parents = new Map(
      Array.isArray(JSON.parse(readData).parents)
        ? JSON.parse(readData).parents
        : new Map()
    );
  }

  async addStudent(student: Student): Promise<Student> {
    this.#students.set(student.id, student);
    await this.save();
    return student;
  }

  async updateStudent(studentId: string, updateData: Partial<Student>) {
    const { id, ...currentStudent } =
      (await this.#students.get(studentId)) || {};
    delete updateData.id;
    const newStudent = { ...currentStudent, ...updateData } as Student;
    this.#students.set(studentId, newStudent);
    await this.save();
    return this.getStudent(studentId);
  }

  async getStudent(id: string) {}

  async deleteStudent(id: string) {}

  // 34:52
}
