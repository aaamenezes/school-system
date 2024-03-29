import { z } from 'zod';
import { getRandomId } from '../../aux/getRandom';
import {
  validNonRequiredString,
  validRequiredGroups,
  validRequiredString
} from '../../aux/validatores';
import { validNonRequiredGroups } from '../../aux/validatores/validNonRequiredGroups';
import { Teacher } from '../../entities';
import { CreateError } from './interfaces';

export function getNewTeacher(
  body: Omit<Teacher, 'id'>,
  validAllProperties: boolean
): Partial<Teacher> | { error: unknown } {
  const {
    name,
    lastName,
    document,
    phone,
    email,
    hiringDate,
    specialization,
    groupsIds
  } = body;

  const newTeacherSchema = validAllProperties
    ? z.object({
        name: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        lastName: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        phone: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        email: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        hiringDate: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        specialization: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        groupsIds: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
      })
    : z.object({
        name: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        lastName: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        phone: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        email: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        hiringDate: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        specialization: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        groupsIds: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
          .optional()
      });

  try {
    const validatedData = newTeacherSchema.parse({
      name,
      lastName,
      document,
      phone,
      email,
      hiringDate,
      specialization,
      groupsIds
    });

    return {
      id: getRandomId(),
      ...validatedData
    };
  } catch (error) {
    console.log(`erro ao criar new teacher:`, error);
    return { error };
  }
}
