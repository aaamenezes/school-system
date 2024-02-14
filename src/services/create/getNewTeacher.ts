import { getRandomId } from '../../aux/getRandomID';
import {
  validRequiredGroups,
  validRequiredString
} from '../../aux/validatores';
import { Teacher } from '../../entities';
import { CreateError } from './interfaces';

export function getNewTeacher(
  data: Omit<Teacher, 'id'>
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
  } = data;

  if (!validRequiredString(name)) return { error: 'name is missing' };
  if (!validRequiredString(lastName)) return { error: 'lastName is missing' };
  if (!validRequiredString(document)) return { error: 'document is missing' };
  if (!validRequiredString(phone)) return { error: 'phone is missing' };
  if (!validRequiredString(email)) return { error: 'email is missing' };
  if (!validRequiredString(hiringDate))
    return { error: 'hiringDate is missing' };
  if (!validRequiredString(specialization))
    return { error: 'specialization is missing' };
  if (!validRequiredGroups(groupsIds)) return { error: 'groupsIds is missing' };

  return {
    id: getRandomId(),
    ...data
  };
}
