import { DB } from '../data/db';
import { TeacherRepository } from '../data/repositories';
import { TeacherService } from '../services';

export function createTeacherService(db: DB) {
  const teacherRepository = new TeacherRepository(db);
  return new TeacherService(teacherRepository);
}
