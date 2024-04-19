export * from './Groups';
export * from './Parents';
export * from './Students';
export * from './Teachers';

/**
 * Em cada arquivo de entidade
 * ele criou uma interface
 * e a classe que recebe as propriedades de cada um
 * adiciona com o this.name = name
 * e finalizou com um getter que retorna um objeto com essas propriedades
 */

////////////////////////////////////////////////////////////////////////////////
import { Group, Parent, Student, Teacher } from './';

export const newEntityMap = {
  students: Student,
  teachers: Teacher,
  groups: Group,
  parents: Parent
};
////////////////////////////////////////////////////////////////////////////////
