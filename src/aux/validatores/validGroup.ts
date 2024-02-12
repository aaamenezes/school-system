import { Group } from '../../entities';
import readEntity from '../../services/read';

export function validGroup(groupId: string) {
  console.log(`1`);
  if (!groupId) return false;
  console.log(`2`);
  if (typeof groupId !== 'string') return false;

  console.log(`3`);
  const groupsIDs = readEntity().group.map((group: Group) => group.id);
  const groupsIsValid = groupsIDs.includes(groupId);

  console.log(`4`);
  return groupsIsValid;
}
