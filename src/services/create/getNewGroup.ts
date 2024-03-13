import { getRandomGroupCode, getRandomId } from '../../aux/getRandom';
import {
  validNonRequiredString,
  validRequiredString
} from '../../aux/validatores';
import { validNonRequiredStudents } from '../../aux/validatores/validNonRequiredStudents';
import { Group } from '../../entities';
import { CreateError } from './interfaces';

export function getNewGroup(
  body: Omit<Group, 'id' | 'code'>,
  validAllProperties: boolean
): Group | CreateError {
  const { teacherId, studentsIds } = body;

  if (validAllProperties) {
    /**
     * Validação na criação da entidade
     * Valida tudo que for obrigatório
     */
    if (!validRequiredString(teacherId))
      return { error: 'teacherId is missing' };
    if (!validNonRequiredStudents(studentsIds))
      return { error: 'studentsIds is missing' };
  } else {
    /**
     * Validação na edição da entidade
     * Tudo é opcional
     */
    if (!validNonRequiredString(teacherId))
      return { error: 'teacherId is missing' };
    if (!validNonRequiredStudents(studentsIds))
      return { error: 'studentsIds is missing' };
  }

  return {
    id: getRandomId(),
    code: getRandomGroupCode(),
    ...body
  };
}
