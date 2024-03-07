import { getRandomGroupCode, getRandomId } from '../../aux/getRandom';
import { validRequiredString } from '../../aux/validatores';
import { validNonRequiredStudents } from '../../aux/validatores/validNonRequiredStudents';
import { Group } from '../../entities';
import { CreateError } from './interfaces';

export function getNewGroup(
  data: Omit<Group, 'id' | 'code'>
): Group | CreateError {
  const { teacherId, studentsIds } = data;

  if (!validRequiredString(teacherId)) return { error: 'teacherId is missing' };
  if (!validNonRequiredStudents(studentsIds))
    return { error: 'studentsIds is missing' };

  return {
    id: getRandomId(),
    code: getRandomGroupCode(),
    teacherId,
    studentsIds
  };
}
