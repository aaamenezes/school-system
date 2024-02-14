import { Parent } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredParents(parentsIds: string[]) {
  if (!parentsIds) return false;
  if (!Array.isArray(parentsIds)) return false;
  if (parentsIds.length === 0) return false;
  if (parentsIds.some(parentId => typeof parentId !== 'string')) return false;

  const parentsIdsFromDb = readEntity().parents.map(
    (parent: Parent) => parent.id
  );

  const parentsIsValid = parentsIds.every(parentId =>
    parentsIdsFromDb.includes(parentId)
  );

  return parentsIsValid;
}
