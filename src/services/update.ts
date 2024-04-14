import fs from 'fs';
import { Entity, Group, Parent, Student, Teacher } from '../entities';
import db from '../../db.json';
import { getNewEntityMap } from '../aux/getNewEntityMap';

type SomeEntity = Parent | Student | Teacher | Group;

export default function updateEntity(
  entity: Entity,
  id: string,
  body: Student & Group & Parent & Teacher
) {
  // verificar se a entidade existe
  const getNewEntity = getNewEntityMap[entity];

  /**
   * Essa validação abaixo está duplicada
   * Ver arquivo index.js app.put(...)
   * Lá já tem uma verificação se a entidade existe
   */
  if (!getNewEntity) {
    return {
      success: false,
      message: `entity "${entity}" não encontrado`
    };
  }

  // Peggar db
  const parseDb = JSON.parse(JSON.stringify(db));

  // verificar se existe alguma entidade com o id fornecido
  const entityToUpdate = parseDb[entity].find(
    (entity: SomeEntity) => entity.id === id
  );

  if (!entityToUpdate) {
    return {
      success: false,
      message: `não foi encontrado nenhum ${entity} com o id ${id}`
    };
  }

  // Receber entidade com novas propriedades e já eliminar o que for undefined
  const entityWithNewProperties: Record<string, unknown> = {};
  Object.entries(getNewEntity(body, false)).forEach(entry => {
    if (entry[1]) {
      entityWithNewProperties[entry[0]] = entry[1];
    }
  });

  // fazer merge do entity existente com o body da requisição
  const updatedEntity = {
    ...entityToUpdate,
    ...entityWithNewProperties
  };

  // substituir o entity antigo no db pelo atualizado
  const newDb = {
    ...parseDb,
    [entity]: parseDb[entity].map((entity: SomeEntity) =>
      entity.id === id ? updatedEntity : entity
    )
  };

  // salvar o db
  fs.writeFile('db.json', JSON.stringify(newDb, null, 2), error => {
    if (error) throw new Error(`Erro ao atualizar ${entity}: ${error}`);
    console.log(`${entity} atualizado com sucesso!`);
  });

  // responder
  return {
    success: true,
    message: `${entity} de id ${id} atualizado com sucesso`
  };
}
