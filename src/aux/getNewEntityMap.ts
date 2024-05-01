/**
 * esse arquivo vai morrer???
 */
import { getNewGroup } from '../services_OLD/create/getNewGroup';
import { getNewParent } from '../services_OLD/create/getNewParent';
import { getNewStudent } from '../services_OLD/create/getNewStudent';
import { getNewTeacher } from '../services_OLD/create/getNewTeacher';

export const getNewEntityMap = {
  students: getNewStudent,
  teachers: getNewTeacher,
  groups: getNewGroup,
  parents: getNewParent
};
