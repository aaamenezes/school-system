import { DB } from '../data/db';
import { ParentRepository } from '../data/repositories';
import { ParentService } from '../services';

export function createParentService(db: DB) {
  const parentRepository = new ParentRepository(db);
  return new ParentService(parentRepository);
}
