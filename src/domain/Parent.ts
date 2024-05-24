import { z } from 'zod';
import { AddressSchema, Serializable } from './types.js';
import { randomUUID } from 'crypto';

export const ParentCreationSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  surname: z.string(),
  phones: z.array(z.string()).nonempty(), // mesma coisa
  emails: z.string().email().array().nonempty(), // mesma coisa
  addresses: z.array(AddressSchema).nonempty(),
  document: z.string()
});

export type ParentCreationType = z.infer<typeof ParentCreationSchema>;

export class Parent implements Serializable {
  firstName: ParentCreationType['firstName'];
  surname: ParentCreationType['surname'];
  phones: ParentCreationType['phones'];
  emails: ParentCreationType['emails'];
  addresses: ParentCreationType['addresses'];
  document: ParentCreationType['document'];
  readonly id: string;

  constructor(data: ParentCreationType) {
    this.firstName = data.firstName;
    this.surname = data.surname;
    this.phones = data.phones;
    this.emails = data.emails;
    this.addresses = data.addresses;
    this.document = data.document;
    this.id = data.id ?? randomUUID();
  }

  static fromObject(data: Record<string, unknown>) {
    const parsed = ParentCreationSchema.parse(data);
    return new Parent(parsed);
  }

  toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      phones: this.phones,
      emails: this.emails,
      addresses: this.addresses,
      document: this.document
    };
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }
}
