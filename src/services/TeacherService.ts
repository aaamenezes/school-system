import {
  Teacher,
  TeacherCreationType,
  TeacherUpdateType
} from '../domain/Teacher.js';
import { ConflictError } from '../domain/errors/Conflict.js';
import { Service } from './BaseService.js';

export class TeacherService extends Service {
  update(id: string, newData: TeacherUpdateType) {
    /**
     * TODO
     * Remover o "as Teacher" abaixo
     * e resolver os erros que surgem
     */
    const existing = this.findById(id) as Teacher;

    const updated = new Teacher({
      ...existing.toObject(),
      ...newData
    });

    this.repository.save(updated);
    return updated;
  }

  create(creationData: TeacherCreationType) {
    const existing = this.repository.listBy('document', creationData.document);
    if (existing.length > 0)
      throw new ConflictError(creationData.document, Teacher);

    const entity = new Teacher(creationData);
    this.repository.save(entity);
    return entity;
  }
}
