import { Student } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredStudents(studentsIds: string[]) {
  if (!studentsIds) return false;
  if (!Array.isArray(studentsIds)) return false;
  if (studentsIds.length === 0) return false;
  if (studentsIds.some(studentId => typeof studentId !== 'string'))
    return false;

  const studentsIdsFromDb = readEntity().students.map(
    (student: Student) => student.id
  );

  const studentsIsValid = studentsIds.every(studentId =>
    studentsIdsFromDb.includes(studentId)
  );

  return studentsIsValid;
}
