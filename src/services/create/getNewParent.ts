import { getRandomId } from '../../aux/getRandom';
import {
  validRequiredArrayString,
  validRequireAddresses,
  validNonRequiredString,
  validRequiredStudents,
  validRequiredString
} from '../../aux/validatores';
import { Parent } from '../../entities';
import { CreateError } from './interfaces';

export function getNewParent(data: Omit<Parent, 'id'>): Parent | CreateError {
  const { name, lastName, phones, emails, addresses, document, studentsIds } =
    data;

  if (!validNonRequiredString(name)) return { error: 'name is missing' };
  if (!validRequiredString(lastName)) return { error: 'lastName is missing' };
  if (!validRequiredArrayString(phones)) return { error: 'phones is missing' };
  if (!validRequiredArrayString(emails)) return { error: 'emails is missing' };
  if (!validRequireAddresses(addresses))
    return { error: 'addresses is missing' };
  if (!validRequiredString(document)) return { error: 'document is missing' };
  if (!validRequiredStudents(studentsIds)) return { error: 'kids is missing' };

  return {
    id: getRandomId(),
    name,
    lastName,
    phones,
    emails,
    addresses,
    document,
    studentsIds
  };
}
