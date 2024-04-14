import fs from 'fs';
import db from '../../../db.json';
import type { Entity, Group, Parent, Student, Teacher } from '../../entities';
import { getNewEntityMap } from '../../aux/getNewEntityMap';

export default function createEntity(
  entity: Entity,
  body: Student & Group & Parent & Teacher
) {
  const getNewEntity = getNewEntityMap[entity];

  if (!getNewEntity) return { success: false, message: 'entity not found' };

  const newEntityResponse = getNewEntity(body, true);

  if ('error' in newEntityResponse)
    return { success: false, message: newEntityResponse.error };

  const parseDb = JSON.parse(JSON.stringify(db));

  const neDb = {
    ...parseDb,
    [entity]: [...parseDb[entity], newEntityResponse]
  };

  fs.writeFile('db.json', JSON.stringify(neDb, null, 2), error => {
    if (error) throw new Error(`Erro ao salvar novo ${entity}: ${error}`);
    console.log(`${entity} criado com sucesso!`);
  });

  return {
    success: true,
    message: `${entity} criado com sucesso!`
  };
}
