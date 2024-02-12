import { getRandomId } from '../../aux/getRandomID';
import {
  validAllergies,
  validBlood,
  validDocument,
  validGroup,
  validMedicines,
  validParents
} from '../../aux/validatores';
import type { Student } from '../../entities';
import type { CreateError } from './interfaces';

export function getNewStudent(
  data: Omit<Student, 'id'>
): Student | CreateError {
  const {
    name,
    lastName,
    birthDay,
    parents,
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
  if (!validParents(parents)) return { error: 'parents is missing' };
  if (!validAllergies(allergies)) return { error: 'allergy is missing' };
  if (!validBlood(blood)) return { error: 'blood is missing' };
  if (!validMedicines(medicines)) return { error: 'medicines is missing' };
  if (!registrationDate) return { error: 'registrationDate is missing' };
  if (!validDocument(document)) return { error: 'document is missing' };
  if (!validGroup(groupId)) return { error: 'groups is missing' };

  return {
    id: getRandomId(),
    ...data
  };
}
