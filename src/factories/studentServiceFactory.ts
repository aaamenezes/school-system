import { DB } from '../data/db';
import { StudentRepository } from '../data/repositories';
import { StudentService } from '../services';

export function createStudentService(db: DB) {
  const studentRepository = new StudentRepository(db);
  return new StudentService(studentRepository);
}
