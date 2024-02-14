import { getRandomId } from '../../aux/getRandomID';
import {
  validRequiredArrayString,
  validRequireAddresses
} from '../../aux/validatores';
import { Parent } from '../../entities';
import { CreateError } from './interfaces';

export function getNewParent(data: Omit<Parent, 'id'>): Parent | CreateError {
  const { name, lastName, phones, emails, addresses, document, studentsIds } =
    data;

  if (!name) return { error: 'name is missing' };
  if (!lastName) return { error: 'lastName is missing' };
  if (!validRequiredArrayString(phones)) return { error: 'phones is missing' };
  if (!validRequiredArrayString(emails)) return { error: 'emails is missing' };
  if (!validRequireAddresses(addresses))
    return { error: 'addresses is missing' };
  // if (!document) return { error: 'document is missing' };
  // if (!studentsIds) return { error: 'kids is missing' };

  return {
    id: getRandomId(),
    ...data
  };
}
