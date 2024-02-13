import { getRandomId } from '../../aux/getRandomID';
import {
  validNonRequiredArrayString,
  validRequiredBlood,
  validNonRequiredString,
  validRequiredGroup,
  validRequiredParents
} from '../../aux/validatores';
import type { Medicines, Allergies, Student } from '../../entities';
import type { CreateError } from './interfaces';

export function getNewStudent(
  data: Omit<Student, 'id'>
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
  } = data;

  if (!name) return { error: 'name is missing' };
  if (!lastName) return { error: 'lastName is missing' };
  if (!birthDay) return { error: 'birthDay is missing' };
  if (!validRequiredParents(parentsIds)) return { error: 'parents is missing' };
  if (!validNonRequiredArrayString<Allergies>(allergies))
    return { error: 'allergy is missing' };
  if (!validRequiredBlood(blood)) return { error: 'blood is missing' };
  if (!validNonRequiredArrayString<Medicines>(medicines))
    return { error: 'medicines is missing' };
  if (!registrationDate) return { error: 'registrationDate is missing' };
  if (!validNonRequiredString(document))
    return { error: 'document is missing' };
  if (!validRequiredGroup(groupId)) return { error: 'groups is missing' };

  return {
    id: getRandomId(),
    ...data
  };
}
