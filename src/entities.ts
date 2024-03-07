export type Allergies = string[];
export type Blood = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type Medicines = string[];
export type Entity = 'parent' | 'student' | 'teacher' | 'group';

export type Address = {
  street: string;
  number: number;
  city: string;
};

export interface Parent {
  id: string;
  name?: string;
  lastName: string;
  phones: string[];
  emails: string[];
  addresses: Address[];
  document: string;
  studentsIds: string[];
}

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

export interface Group {
  id: string;
  code: string;
  // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  // '-'
  // 'M' | 'T' | 'N'
  teacherId: string;
  studentsIds?: string[];
}
