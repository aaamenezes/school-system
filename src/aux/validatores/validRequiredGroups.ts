import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredGroups(groupsIds: string[]) {
  if (!groupsIds) return false;
  if (!Array.isArray(groupsIds)) return false;
  if (groupsIds.length === 0) return false;
  if (groupsIds.some(groupId => typeof groupId !== 'string')) return false;

  const groupsIdsFromDb = readEntity().groups.map((group: Group) => group.id);
  const groupsIsValid = groupsIds.every(groupId =>
    groupsIdsFromDb.includes(groupId)
  );

  return groupsIsValid;
}
