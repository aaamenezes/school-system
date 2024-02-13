import fs from 'fs';
import db from '../../../db.json';
import type { Entity, Group, Parent, Student, Teacher } from '../../entities';
import { getNewStudent } from './getNewStudent';
import { getNewTeacher } from './getNewTeacher';
import { getNewGroup } from './getNewGroup';
import { getNewParent } from './getNewParent';

const getNewEntityMap = {
  student: getNewStudent,
  teacher: getNewTeacher,
  group: getNewGroup,
  parent: getNewParent
};

export default function createEntity(
  entity: Entity,
  body: Student & Group & Parent & Teacher
) {
  if (!getNewEntityMap[entity])
    return { sucess: false, message: 'entity not found' };
  const newEntity = getNewEntityMap[entity](body);

  if ('error' in newEntity) return { sucess: false, message: newEntity.error };

  const newDB = {
    ...db,
    [entity]: [...db[entity], newEntity]
    // [entity]: [newEntity]
  };

  fs.writeFile('db.json', JSON.stringify(newDB, null, 2), error => {
    if (error) throw new Error(`Erro ao salvar novo ${entity}: ${error}`);
    console.log(`${entity} criado com sucesso!`);
  });

  return {
    sucess: true,
    message: `${entity} criado com sucesso!`
  };
}
