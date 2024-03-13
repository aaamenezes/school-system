import { getRandomId } from '../../aux/getRandom';
import {
  validNonRequiredString,
  validRequiredGroups,
  validRequiredString
} from '../../aux/validatores';
import { validNonRequiredGroups } from '../../aux/validatores/validNonRequiredGroups';
import { Teacher } from '../../entities';
import { CreateError } from './interfaces';

export function getNewTeacher(
  body: Omit<Teacher, 'id'>,
  validAllProperties: boolean
): Teacher | CreateError {
  const {
    name,
    lastName,
    document,
    phone,
    email,
    hiringDate,
    specialization,
    groupsIds
  } = body;

  if (validAllProperties) {
    /**
     * Validação na criação da entidade
     * Valida tudo que for obrigatório
     */
    if (!validRequiredString(name)) return { error: 'name is missing' };
    if (!validRequiredString(lastName)) return { error: 'lastName is missing' };
    if (!validRequiredString(document)) return { error: 'document is missing' };
    if (!validRequiredString(phone)) return { error: 'phone is missing' };
    if (!validRequiredString(email)) return { error: 'email is missing' };
    if (!validRequiredString(hiringDate))
      return { error: 'hiringDate is missing' };
    if (!validNonRequiredString(specialization))
      return { error: 'specialization is missing' };
    if (!validRequiredGroups(groupsIds))
      return { error: 'groupsIds is missing' };
  } else {
    /**
     * Validação na edição da entidade
     * Tudo é opcional
     */
    if (!validNonRequiredString(name)) return { error: 'name is missing' };
    if (!validNonRequiredString(lastName))
      return { error: 'lastName is missing' };
    if (!validNonRequiredString(document))
      return { error: 'document is missing' };
    if (!validNonRequiredString(phone)) return { error: 'phone is missing' };
    if (!validNonRequiredString(email)) return { error: 'email is missing' };
    if (!validNonRequiredString(hiringDate))
      return { error: 'hiringDate is missing' };
    if (!validNonRequiredString(specialization))
      return { error: 'specialization is missing' };
    if (!validNonRequiredGroups(groupsIds))
      return { error: 'groupsIds is missing' };
  }

  return {
    id: getRandomId(),
    ...body
  };
}
