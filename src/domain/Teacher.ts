import { z } from 'zod';
import { Serializable } from './types.js';
import { randomUUID } from 'crypto';

export const TeacherCreationSchema = z.object({
  firstName: z.string(),
  phone: z.string(),
  email: z.string(),
  document: z.string(),
  salary: z.number().min(1),
  surname: z.string(),
  hiringDate: z
    .string()
    .datetime()
    .refine(date => !isNaN(new Date(date).getTime())),
  major: z.string(),
  id: z.string().uuid().optional()
});

export type TeacherCreationType = z.infer<typeof TeacherCreationSchema>;
export const TeacherUpdateSchema = TeacherCreationSchema.partial().omit({
  id: true
});
export type TeacherUpdateType = z.infer<typeof TeacherUpdateSchema>;

export class Teacher implements Serializable {
  firstName: TeacherCreationType['firstName'];
  phone: TeacherCreationType['phone'];
  email: TeacherCreationType['email'];
  document: TeacherCreationType['document'];
  salary: TeacherCreationType['salary'];
  hiringDate: Date;
  surname: TeacherCreationType['surname'];
  major: TeacherCreationType['major'];
  readonly id: string;

  constructor(data: TeacherCreationType) {
    const parsedData = TeacherCreationSchema.parse(data);

    this.id = parsedData.id ?? randomUUID();
    this.firstName = parsedData.firstName;
    this.phone = parsedData.phone;
    this.email = parsedData.email;
    this.document = parsedData.document;
    this.salary = parsedData.salary;
    this.hiringDate = new Date(parsedData.hiringDate);
    this.surname = parsedData.surname;
    this.major = parsedData.major;
  }

  static fromObject(data: Record<string, unknown>) {
    const parsed = TeacherCreationSchema.parse(data);
    return new Teacher(parsed);
  }

  toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  toObject(): Record<string, unknown> {
    return {
      id: this.id,
      firstName: this.firstName,
      phone: this.phone,
      email: this.email,
      document: this.document,
      salary: this.salary,
      hiringDate: this.hiringDate.toISOString(),
      surname: this.surname,
      major: this.major
    };
  }
}
