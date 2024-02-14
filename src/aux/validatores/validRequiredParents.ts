import { Parent } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredParents(parents: string[]) {
  if (!Array.isArray(parents)) return false;
  if (parents.length === 0) return false;
  if (!parents.every(parent => typeof parent === 'string')) return false;

  const parentsIds = readEntity().parents.map((parent: Parent) => parent.id);

  const parentsIsValid = parents
    .map(parentID => parentsIds.includes(parentID))
    .reduce((result, current) => result && current, true);

  return parentsIsValid;
}
