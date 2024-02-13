import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validGroup(groupId: string) {
  if (!groupId) return false;
  if (typeof groupId !== 'string') return false;

  const groupsIDs = readEntity().group.map((group: Group) => group.id);
  const groupsIsValid = groupsIDs.includes(groupId);

  return groupsIsValid;
}
