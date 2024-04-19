export type Allergies = string[];
export type Blood = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type Medicines = string[];
export type Entity = 'parents' | 'students' | 'teachers' | 'groups';

export type Address = {
  street: string;
  number: number;
  city: string;
};
