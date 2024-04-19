import { z } from 'zod';
import { getRandomId } from '../aux/getRandom';
import { Allergies, Blood, Medicines } from '../types';
import { BLOOD } from '../contants';

export interface Student {
  id: string;
  name: string;
  lastName: string;
  birthDay: string;
  parentsIds: string[];
  allergies?: Allergies;
  blood: Blood;
  medicines?: Medicines;
  registrationDate: string;
  document?: string;
  groupId: string;
}

export function Student(
  body: Student,
  validAllProperties: boolean
): Partial<Student> | { error: unknown } {
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
          .nonempty()
          .optional(),
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

  try {
    const validatedData = newStudentSchema.parse({
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
    });

    return {
      id: validAllProperties ? getRandomId() : body.id,
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
    };
  } catch (error) {
    console.log(`erro ao criar new teacher:`, error);
    return { error };
  }
}
