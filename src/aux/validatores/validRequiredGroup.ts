import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validRequiredGroup(groupId: string) {
  console.log(`typeof groupId:`, typeof groupId);
  if (!groupId) return false;
  if (typeof groupId !== 'string') return false;

  const groupsIds = readEntity().groups.map((group: Group) => group.id);
  const groupsIsValid = groupsIds.includes(groupId);

  return groupsIsValid;
}
