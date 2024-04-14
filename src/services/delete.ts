import fs from 'fs';
import db from '../../db.json';
import { Entity, Group, Parent, Student, Teacher } from '../entities';

type SomeEntity = Parent | Student | Teacher | Group;

export default function deleteEntity(id: string, entity: Entity) {
  const parseDb = JSON.parse(JSON.stringify(db));

  const entityFromDb: SomeEntity[] = parseDb[entity];

  /**
   * Essa validação abaixo está duplicada
   * Ver arquivo index.js app.delete(...)
   * Lá já tem uma verificação se a entidade existe
   */
  if (!entityFromDb) {
    return {
      success: false,
      message: `entity "${entity}" não encontrado`
    };
  }

  const idFound = entityFromDb.some((item: SomeEntity) => item.id === id);
  if (!idFound) {
    return {
      success: false,
      message: `não foi encontrado nenhum ${entity} com o id ${id}`
    };
  }

  const newDb = {
    ...parseDb,
    [entity]: entityFromDb.filter((item: SomeEntity) => item.id !== id)
  };

  fs.writeFile('db.json', JSON.stringify(newDb, null, 2), error => {
    if (error) throw new Error(`Erro ao deletar ${entity}: ${error}`);
    console.log(`${entity} deletado com sucesso!`);
  });

  return {
    success: true,
    message: `${entity} de id ${id} deletado com sucesso`
  };
}
