import fs from 'fs';
import db from '../../../db.json';
import type { Entity } from '../../types';
import { newEntityMap } from '../../domain';
import { Group, Parent, Student, Teacher } from '../../domain';

export default function createEntity(
  entity: Entity,
  body: Student & Group & Parent & Teacher
) {
  const newEntity = newEntityMap[entity];

  if (!newEntity) return { success: false, message: 'entity not found' };

  const newEntityResponse = newEntity(body, true);

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
