export interface TeacherProps {
  id: string;
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization?: string;
  groupsIds: string[];
}

export class Teacher {
  id: string;
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization?: string;
  groupsIds: string[];

  constructor(props: TeacherProps) {
    this.id = props.id;
    this.name = props.name;
    this.lastName = props.lastName;
    this.document = props.document;
    this.phone = props.phone;
    this.email = props.email;
    this.hiringDate = props.hiringDate;
    this.specialization = props.specialization;
    this.groupsIds = props.groupsIds;
  }

  get object(): TeacherProps {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      document: this.document,
      phone: this.phone,
      email: this.email,
      hiringDate: this.hiringDate,
      specialization: this.specialization,
      groupsIds: this.groupsIds
    };
  }
}

/*
import { z } from 'zod';
import { getRandomId } from '../aux/getRandom';

export interface Teacher {
  id: string;
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization?: string;
  groupsIds: string[];
}

export function Teacher(
  body: Teacher,
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
      id: validAllProperties ? getRandomId() : body.id,
      ...validatedData
    };
  } catch (error) {
    console.log(`erro ao criar new teacher:`, error);
    return { error };
  }
}
*/
