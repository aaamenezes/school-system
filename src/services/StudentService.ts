import { StudentRepository } from '../data/StudentRepository.js';
import { Parent } from '../domain/Parent.js';
import {
  Student,
  StudentCreationType,
  StudentUpdateType
} from '../domain/Student.js';
import { ConflictError } from '../domain/errors/Conflict.js';
import { EmptyDependencyError } from '../domain/errors/EmptyDependency.js';
import { Service } from './BaseService.js';
import { ParentService } from './ParentService.js';

export class StudentService extends Service {
  constructor(
    repository: StudentRepository,
    private readonly parentService: ParentService
  ) {
    super(repository);
  }

  update(id: string, newData: StudentUpdateType) {
    /**
     * TODO
     * Remover o "as Student" abaixo
     * e resolver os erros que surgem
     */
    const existing = this.findById(id) as Student;

    const updated = new Student({
      ...existing.toObject(),
      ...newData
    });

    this.repository.save(updated);
    return updated;
  }

  create(creationData: StudentCreationType) {
    const existing = this.repository.listBy('document', creationData.document);
    if (existing.length > 0)
      throw new ConflictError(creationData.document, Student);

    creationData.parents.forEach(parent => {
      // Isso pode estourar um erro, se o parent não existir
      this.parentService.findById(parent);
    });

    const entity = new Student(creationData);
    this.repository.save(entity);
    return entity;
  }

  getParents(studentId: string) {
    const student = this.findById(studentId) as Student;
    return student.parents.map(parent =>
      this.parentService.findById(parent)
    ) as Parent[];
  }

  linkParent(id: string, parentsToUpdate: StudentCreationType['parents']) {
    const student = this.findById(id) as Student;

    parentsToUpdate.forEach(parent => {
      // Isso pode estourar um erro, se o parent não existir
      this.parentService.findById(parent);
    });

    const newParents = parentsToUpdate.filter(
      parentId => !student.parents.includes(parentId)
    );

    this.#assertAtLeastOneParentLeft(newParents);
    student.parents = [...student.parents, ...newParents];
    this.repository.save(student);
    return student;
  }

  #assertAtLeastOneParentLeft(
    parentArray: unknown[]
  ): asserts parentArray is [string, ...string[]] {
    if (parentArray.length === 0)
      throw new EmptyDependencyError(Student, Parent);
  }
}
