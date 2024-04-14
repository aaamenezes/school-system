import { getRandomGroupCode, getRandomId } from '../../aux/getRandom';
import { Group } from '../../entities';
import { z } from 'zod';

export function getNewGroup(
  body: Group,
  validAllProperties: boolean
): Partial<Group> | { error: unknown } {
  /**
   * Melhorar a tipagem do retorno
   * { error: unknown } ta mto ruim
   */
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
