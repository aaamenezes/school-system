import { z } from 'zod';
import { getRandomId } from '../../aux/getRandom';
import { Parent } from '../../domain';

export function getNewParent(
  body: Parent,
  validAllProperties: boolean
): Partial<Parent> | { error: unknown } {
  const { name, lastName, phones, emails, addresses, document, studentsIds } =
    body;

  const newParentSchema = validAllProperties
    ? z.object({
        name: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        lastName: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        phones: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty(),
        emails: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .nonempty(),
        addresses: z.array(
          z.object({
            street: z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value)),
            number: z.number().min(1),
            city: z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          })
        ),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value)),
        studentsIds: z.array(
          z
            .string()
            .min(1)
            .refine(value => !/^\s*$/.test(value))
        )
      })
    : z.object({
        name: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        phones: z.array(z.string()).nonempty().optional(),
        emails: z.array(z.string()).nonempty().optional(),
        addresses: z
          .array(
            z.object({
              street: z
                .string()
                .min(1)
                .refine(value => !/^\s*$/.test(value)),
              number: z.number().min(1),
              city: z
                .string()
                .min(1)
                .refine(value => !/^\s*$/.test(value))
            })
          )
          .optional(),
        document: z
          .string()
          .min(1)
          .refine(value => !/^\s*$/.test(value))
          .optional(),
        studentsIds: z
          .array(
            z
              .string()
              .min(1)
              .refine(value => !/^\s*$/.test(value))
          )
          .optional()
      });

  try {
    const validatedData = newParentSchema.parse({
      name,
      lastName,
      phones,
      emails,
      addresses,
      document,
      studentsIds
    });

    return {
      id: validAllProperties ? getRandomId() : body.id,
      ...validatedData
    };
  } catch (error) {
    console.log(`erro ao criar new parent:`, error);
    return { error };
  }
}
