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

  // criar entidade com novas propriedades
  /**
   * TODO aqui vai dar problema
   * o getNewEntity vai validar tudo
   * mas na verdade eu devo permitir que algumas propriedades faltem
   * pois vou só atualizar algumas
   * e não preciso atualizar todas
   */
  const entityWithNewProperties = getNewEntity(body, false);

  // fazer merge do entity existente com os dados da requisição
  const updatedEntity = {
    ...entityToUpdate,
    ...entityWithNewProperties
  };

  // substituir o entity antido no db pelo atualizado

  // salvar o db

  // responder
  return {
    success: true,
    message: `${entity} de id ${id} atualizado com sucesso`
  };
}
