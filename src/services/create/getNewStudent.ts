import { z } from 'zod';
import { getRandomId } from '../../aux/getRandom';
import {
  validNonRequiredArrayString,
  validRequiredBlood,
  validNonRequiredString,
  validRequiredGroups,
  validRequiredParents,
  validRequiredString
} from '../../aux/validatores';
import { validNonRequiredBlood } from '../../aux/validatores/validNonRequiredBlood';
import { validNonRequiredGroups } from '../../aux/validatores/validNonRequiredGroups';
import { validNonRequiredParents } from '../../aux/validatores/validNonRequiredParents';
import {
  type Medicines,
  type Allergies,
  type Student,
  BLOOD
} from '../../entities';
import type { CreateError } from './interfaces';

export function getNewStudent(
  body: Omit<Student, 'id'>,
  validAllProperties: boolean
): Student | CreateError {
  const {
    name,
    lastName,
    birthDay,
    parentsIds,
    allergies,
    blood,
    medicines,
    registrationDate,
    document,
    groupId
  } = body;

  const newStudentSchema = validAllProperties
    ? z.object({
        name: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        lastName: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        birthDay: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        parentsIds: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty(),
        allergies: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty(),
        blood: z.string().refine(value => BLOOD.includes(value)),
        medicines: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
          .optional(),
        registrationDate: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        groupId: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
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
        birthDay: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        parentsIds: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
          .optional(),
        allergies: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
          .optional(),
        blood: z
          .string()
          .refine(value => BLOOD.includes(value))
          .optional(),
        medicines: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty()
          .optional(),
        registrationDate: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        groupId: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional()
      });

  return {
    id: getRandomId(),
    ...body
  };
}
