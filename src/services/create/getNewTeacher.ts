import { getRandomId } from '../../aux/getRandomID';
import { validRequiredGroups } from '../../aux/validatores';
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

  if (!name) return { error: 'name is missing' };
  if (!lastName) return { error: 'lastName is missing' };
  if (!document) return { error: 'document is missing' };
  if (!phone) return { error: 'phone is missing' };
  if (!email) return { error: 'email is missing' };
  if (!hiringDate) return { error: 'hiringDate is missing' };
  if (!specialization) return { error: 'specialization is missing' };
  if (!validRequiredGroups(groupsIds)) return { error: 'groupsIds is missing' };

  return {
    id: getRandomId(),
    ...data
  };
}
