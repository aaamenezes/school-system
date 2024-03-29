import db from '../../db.json';
import { Group, Parent, Student, Teacher } from '../entities';

export default function readEntity(): {
  students: Student[];
  teachers: Teacher[];
  groups: Group[];
  parents: Parent[];
} {
  return JSON.parse(JSON.stringify(db));
}
