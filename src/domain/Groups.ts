export interface GroupProps {
  id: string;
  code: string;
  teacherId: string;
  studentsIds?: string[];
}

export class Group {
  id: string;
  code: string;
  teacherId: string;
  studentsIds?: string[];

  constructor(props: GroupProps) {
    this.id = props.id;
    this.code = props.code;
    this.teacherId = props.teacherId;
    this.studentsIds = props.studentsIds;
  }

  get object(): GroupProps {
    return {
      id: this.id,
      code: this.code,
      teacherId: this.teacherId,
      studentsIds: this.studentsIds
    };
  }
}

/*
import { z } from 'zod';
import { getRandomGroupCode, getRandomId } from '../aux/getRandom';

export interface Group {
  id: string;
  code: string;
  teacherId: string;
  studentsIds?: string[];
}

export function Group(
  body: Group,
  validAllProperties: boolean
): Partial<Group> | { error: unknown } {
  // Melhorar a tipagem do retorno
  // { error: unknown } ta mto ruim
  const { teacherId, studentsIds, code } = body;

  const newGroupSchema = validAllProperties
    ? z.object({
        teacherId: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        studentsIds: z.array(z.string()).nonempty().optional()
      })
    : z.object({
        teacherId: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        studentsIds: z.array(z.string()).nonempty().optional()
      });

  try {
    const validatedData = newGroupSchema.parse({ teacherId, studentsIds });

    return {
      id: validAllProperties ? getRandomId() : body.id,
      code: validAllProperties ? getRandomGroupCode() : code,
      ...validatedData
    };
  } catch (error) {
    console.log(`erro ao criar new group:`, error);
    return { error };
  }
}
*/
