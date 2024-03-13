import { getRandomId } from '../../aux/getRandom';
import {
  validNonRequiredArrayString,
  validRequiredBlood,
  validNonRequiredString,
  validRequiredGroups,
  validRequiredParents,
  validRequiredString
} from '../../aux/validatores';
import { validNonRequiredBlood } from '../../aux/validatores/validNonRequiredBlood';
import { validNonRequiredGroups } from '../../aux/validatores/validNonRequiredGroups';
import { validNonRequiredParents } from '../../aux/validatores/validNonRequiredParents';
import type { Medicines, Allergies, Student } from '../../entities';
import type { CreateError } from './interfaces';

export function getNewStudent(
  body: Omit<Student, 'id'>,
  validAllProperties: boolean
): Student | CreateError {
  const {
    name,
    lastName,
    birthDay,
    parentsIds,
    allergies,
    blood,
    medicines,
    registrationDate,
    document,
    groupId
  } = body;

  if (validAllProperties) {
    /**
     * Validação na criação da entidade
     * Valida tudo que for obrigatório
     */
    if (!validRequiredString(name)) return { error: 'name is missing' };
    if (!validRequiredString(lastName)) return { error: 'lastName is missing' };
    if (!validRequiredString(birthDay)) return { error: 'birthDay is missing' };
    if (!validRequiredParents(parentsIds))
      return { error: 'parents is missing' };
    if (!validNonRequiredArrayString<Allergies>(allergies))
      return { error: 'allergy is missing' };
    if (!validRequiredBlood(blood)) return { error: 'blood is missing' };
    if (!validNonRequiredArrayString<Medicines>(medicines))
      return { error: 'medicines is missing' };
    if (!registrationDate) return { error: 'registrationDate is missing' };
    if (!validNonRequiredString(document))
      return { error: 'document is missing' };
    if (!validRequiredGroups([groupId])) return { error: 'groups is missing' };
  } else {
    /**
     * Validação na edição da entidade
     * Tudo é opcional
     */
    if (!validNonRequiredString(name)) return { error: 'name is missing' };
    if (!validNonRequiredString(lastName))
      return { error: 'lastName is missing' };
    if (!validNonRequiredString(birthDay))
      return { error: 'birthDay is missing' };
    if (!validNonRequiredParents(parentsIds))
      return { error: 'parents is missing' };
    if (!validNonRequiredArrayString<Allergies>(allergies))
      return { error: 'allergy is missing' };
    if (!validNonRequiredBlood(blood)) return { error: 'blood is missing' };
    if (!validNonRequiredArrayString<Medicines>(medicines))
      return { error: 'medicines is missing' };
    if (!validNonRequiredString(registrationDate))
      return { error: 'registrationDate is missing' };
    if (!validNonRequiredString(document))
      return { error: 'document is missing' };
    if (!validNonRequiredGroups([groupId]))
      return { error: 'groups is missing' };
  }

  return {
    id: getRandomId(),
    ...body
  };
}
