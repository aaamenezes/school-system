import db from '../../db.json';
import { Group, Parent, Student, Teacher } from '../entities';

export default function readEntity(): {
  student: Student[];
  teacher: Teacher[];
  group: Group[];
  parent: Parent[];
} {
  return JSON.parse(JSON.stringify(db));
}
