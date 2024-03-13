import { getRandomId } from '../../aux/getRandom';
import {
  validRequiredArrayString,
  validRequiredAddresses,
  validNonRequiredString,
  validRequiredStudents,
  validRequiredString,
  validNonRequiredArrayString
} from '../../aux/validatores';
import { validNonRequiredAddresses } from '../../aux/validatores/validNonRequiredAddress';
import { validNonRequiredStudents } from '../../aux/validatores/validNonRequiredStudents';
import { Parent } from '../../entities';
import { CreateError } from './interfaces';

export function getNewParent(
  body: Omit<Parent, 'id'>,
  validAllProperties: boolean
): Parent | CreateError {
  const { name, lastName, phones, emails, addresses, document, studentsIds } =
    body;

  if (validAllProperties) {
    /**
     * Validação na criação da entidade
     * Valida tudo que for obrigatório
     */
    if (!validNonRequiredString(name)) return { error: 'name is missing' };
    if (!validRequiredString(lastName)) return { error: 'lastName is missing' };
    if (!validRequiredArrayString(phones))
      return { error: 'phones is missing' };
    if (!validRequiredArrayString(emails))
      return { error: 'emails is missing' };
    if (!validRequiredAddresses(addresses))
      return { error: 'addresses is missing' };
    if (!validRequiredString(document)) return { error: 'document is missing' };
    if (!validRequiredStudents(studentsIds))
      return { error: 'kids is missing' };
  } else {
    /**
     * Validação na edição da entidade
     * Tudo é opcional
     */
    if (!validNonRequiredString(name)) return { error: 'name is missing' };
    if (!validNonRequiredString(lastName))
      return { error: 'lastName is missing' };
    if (!validNonRequiredArrayString(phones))
      return { error: 'phones is missing' };
    if (!validNonRequiredArrayString(emails))
      return { error: 'emails is missing' };
    if (!validNonRequiredAddresses(addresses))
      return { error: 'addresses is missing' };
    if (!validNonRequiredString(document))
      return { error: 'document is missing' };
    if (!validNonRequiredStudents(studentsIds))
      return { error: 'kids is missing' };
  }

  return {
    id: getRandomId(),
    ...body
  };
}
