import { z } from 'zod';
import { Serializable } from './types.js';
import { randomUUID } from 'crypto';

export const StudentCreationSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  surname: z.string(),
  document: z.string(),
  bloodTyppe: z.string(),
  birthDate: z
    .string()
    .datetime()
    .refine(date => !isNaN(new Date(date).getTime())),
  allergies: z.string().array().optional(),
  medications: z.string().array().optional(),
  startDate: z
    .string()
    .datetime()
    .refine(date => !isNaN(new Date(date).getTime())),
  parents: z.string().uuid().array().nonempty(),
  class: z.string().uuid()
});

export type StudentCreationType = z.infer<typeof StudentCreationSchema>;
export const StudentUpdateSchema = StudentCreationSchema.partial().omit({
  id: true
});
export type StudentUpdateType = z.infer<typeof StudentUpdateSchema>;

export class Student implements Serializable {
  readonly id: string;
  firstName: StudentCreationType['firstName'];
  surname: StudentCreationType['surname'];
  document: StudentCreationType['document'];
  bloodTyppe: StudentCreationType['bloodTyppe'];
  birthDate: Date;
  allergies: StudentCreationType['allergies'];
  medications: StudentCreationType['medications'];
  startDate: Date;
  #parents: StudentCreationType['parents'];
  class: StudentCreationType['class'];

  constructor(data: StudentCreationType) {
    const parsedData = StudentCreationSchema.parse(data);

    this.id = parsedData.id ?? randomUUID();
    this.firstName = parsedData.firstName;
    this.surname = parsedData.surname;
    this.document = parsedData.document;
    this.bloodTyppe = parsedData.bloodTyppe;
    this.birthDate = new Date(parsedData.birthDate);
    this.allergies = parsedData.allergies;
    this.medications = parsedData.medications;
    this.startDate = new Date(parsedData.startDate);
    this.#parents = parsedData.parents;
    this.class = parsedData.class;
  }

  get parents() {
    return this.#parents;
  }

  set parents(value) {
    this.#parents = value;
  }

  static fromObject(data: Record<string, unknown>) {
    const parsed = StudentCreationSchema.parse(data);
    return new Student(parsed);
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      document: this.document,
      bloodTyppe: this.bloodTyppe,
      birthDate: this.birthDate.toISOString(),
      allergies: this.allergies,
      medications: this.medications,
      startDate: this.startDate.toISOString(),
      parents: this.#parents,
      class: this.class
    };
  }
}
