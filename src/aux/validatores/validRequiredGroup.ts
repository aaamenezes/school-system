import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredGroup(groupId: string) {
  if (!groupId) return false;
  if (typeof groupId !== 'string') return false;

  const groupsIds = readEntity().group.map((group: Group) => group.id);
  const groupsIsValid = groupsIds.includes(groupId);

  return groupsIsValid;
}
