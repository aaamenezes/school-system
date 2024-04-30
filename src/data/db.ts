import { constants, writeFile } from 'fs';
import { access, readFile } from 'fs/promises';
import path from 'path';
import {
  Group,
  GroupProps,
  Parent,
  ParentProps,
  Student,
  StudentProps,
  Teacher,
  TeacherProps
} from '../domain';

export interface DB {
  students: Student[];
  teachers: Teacher[];
  groups: Group[];
  parents: Parent[];
}

export class DB {
  static instance: DB;

  #students: Map<string, StudentProps> = new Map();
  #teachers: Map<string, TeacherProps> = new Map();
  #groups: Map<string, GroupProps> = new Map();
  #parents: Map<string, ParentProps> = new Map();
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

  /**
   * Salva os dados do estado da classe no DB
   */
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

  /**
   * Carrega os dados do DB no estado da classe
   */
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

  /**
   * STUDENTS
   */

  // POST
  async addStudent(student: StudentProps) {
    this.#students.set(student.id, student);
    await this.save();
    return student;
  }

  // PUT
  async updateStudent(studentId: string, updateData: Partial<StudentProps>) {
    const { id, ...currentStudent } =
      (await this.#students.get(studentId)) || {};
    delete updateData.id;
    const newStudent = { ...currentStudent, ...updateData } as StudentProps;
    this.#students.set(studentId, newStudent);
    await this.save();
    return this.getStudent(studentId);
  }

  // DELETE
  async deleteStudent(id: string): Promise<void> {
    this.#students.delete(id);
    await this.save();
  }

  // GET
  async getStudent(id: string) {
    return this.#students.get(id);
  }

  // GET
  async listStudents() {
    return [...this.#students.values()];
  }

  /**
   * TEACHERS
   */

  // POST
  async addTeacher(teacher: TeacherProps): Promise<TeacherProps> {
    this.#teachers.set(teacher.id, teacher);
    await this.save();
    return teacher;
  }

  // PUT
  async updateTeacher(teacherId: string, updateData: Partial<TeacherProps>) {
    const { id, ...currentTeacher } =
      (await this.#teachers.get(teacherId)) || {};
    delete updateData.id;
    const newTeacher = { ...currentTeacher, ...updateData } as TeacherProps;
    this.#teachers.set(teacherId, newTeacher);
    await this.save();
    return this.getTeacher(teacherId);
  }

  // DELETE
  async deleteTeacher(id: string): Promise<void> {
    this.#teachers.delete(id);
    await this.save();
  }

  // GET
  async getTeacher(id: string) {
    return this.#teachers.get(id);
  }

  // GET
  async listTeachers() {
    return [...this.#teachers.values()];
  }

  /**
   * GROUPS
   */

  // POST
  async addGroup(group: GroupProps): Promise<GroupProps> {
    this.#groups.set(group.id, group);
    await this.save();
    return group;
  }

  // PUT
  async updateGroup(groupId: string, updateData: Partial<GroupProps>) {
    const { id, ...currentGroup } = (await this.#groups.get(groupId)) || {};
    delete updateData.id;
    const newGroup = { ...currentGroup, ...updateData } as GroupProps;
    this.#groups.set(groupId, newGroup);
    await this.save();
    return this.getGroup(groupId);
  }

  // DELETE
  async deleteGroup(id: string): Promise<void> {
    this.#groups.delete(id);
    await this.save();
  }

  // GET
  async getGroup(id: string) {
    return this.#groups.get(id);
  }

  // GET
  async listGroups() {
    return [...this.#groups.values()];
  }

  /**
   * PARENTS
   */

  // POST
  async addParent(parent: ParentProps): Promise<ParentProps> {
    this.#parents.set(parent.id, parent);
    await this.save();
    return parent;
  }

  // PUT
  async updateParent(parentId: string, updateData: Partial<ParentProps>) {
    const { id, ...currentParent } = (await this.#parents.get(parentId)) || {};
    delete updateData.id;
    const newParent = { ...currentParent, ...updateData } as ParentProps;
    this.#parents.set(parentId, newParent);
    await this.save();
    return this.getParent(parentId);
  }

  // DELETE
  async deleteParent(id: string): Promise<void> {
    this.#parents.delete(id);
    await this.save();
  }

  // GET
  async getParent(id: string) {
    return this.#parents.get(id);
  }

  // GET
  async listParents() {
    return [...this.#parents.values()];
  }
}
