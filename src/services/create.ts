import fs from 'fs';
import db from '../../db.json';
import type { Entity, Group, Parent, Student, Teacher } from '../entities';
import { getRandomId } from '../aux/getRandomID';

interface CreateError {
  error: string;
}

interface ReadyStudent extends Student {
  registrationID: string;
}

function getNewStudent(data: Student): ReadyStudent | CreateError {
  const {
    name,
    lastName,
    birthDay,
    /*parents,*/ blood,
    registrationDate /*group*/
  } = data;

  if (!name) return { error: 'name is missing' };
  if (!lastName) return { error: 'lastName is missing' };
  if (!birthDay) return { error: 'birthDay is missing' };
  // if (!parents) return { error: 'parents is missing'};
  if (!['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].includes(blood))
    return { error: 'blood is missing' };
  if (!registrationDate) return { error: 'registrationDate is missing' };
  // if (!group) return { error: 'group is missing'};

  return {
    registrationID: getRandomId(),
    ...data
  };
}

function getNewTeacher(data: Teacher): Teacher {
  return data;
}

function getNewGroup(data: Group): Group {
  /**
   * Criar Group
   * {NUMBER} + {LETTER} - {SHIFT}
   */
  return data;
}

function getNewParent(data: Parent): Parent {
  return data;
}

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

  const newData = {
    ...allData,
    [entity]: [...allData[entity], newEntity]
  };

  fs.writeFile('db.json', JSON.stringify(newData, null, 2), error => {
    if (error) throw new Error(`Erro ao salvar novo ${entity}`);
    console.log(`${entity} criado com sucesso!`);
  });

  return {
    sucess: true,
    message: `${entity} criado com sucesso!`
  };
}
