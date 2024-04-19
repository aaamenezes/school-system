/**
 * esse arquivo vai morrer???
 */
import { getNewGroup } from '../services/create/getNewGroup';
import { getNewParent } from '../services/create/getNewParent';
import { getNewStudent } from '../services/create/getNewStudent';
import { getNewTeacher } from '../services/create/getNewTeacher';

export const getNewEntityMap = {
  students: getNewStudent,
  teachers: getNewTeacher,
  groups: getNewGroup,
  parents: getNewParent
};
