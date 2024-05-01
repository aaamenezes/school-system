import { DB } from '../data/db';
import { GroupRepository } from '../data/repositories';
import { GroupService } from '../services';
import { createStudentService } from './studentServiceFactory';

export function createGroupService(db: DB) {
  const groupRepository = new GroupRepository(db);
  const studentRepository = createStudentService(db);
  return new GroupService(groupRepository, studentRepository);
}
