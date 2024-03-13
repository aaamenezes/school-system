import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validNonRequiredGroups(groupsIds: string[]) {
  if (!groupsIds) return true;
  if (!Array.isArray(groupsIds)) return false;
  if (groupsIds.length === 0) return true;
  if (groupsIds.some(groupId => typeof groupId !== 'string')) return false;

  const groupsIdsFromDb = readEntity().groups.map((group: Group) => group.id);
  const groupsIsValid = groupsIds.every(groupId =>
    groupsIdsFromDb.includes(groupId)
  );

  return groupsIsValid;
}
