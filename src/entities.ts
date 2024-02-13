interface Parent {
  id: string;
  name?: string;
  lastName: string;
  phones: string[];
  emails: string[];
  addresses: { street: string; number: number; city: string }[];
  document?: string;
  studentsIds: string[];
}

type Allergies = string[];
type Blood = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
type Medicines = string[];

interface Student {
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

interface Teacher {
  id: string;
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization: string;
  groupsIds: string[];
}

interface Group {
  id: string;
  code: string;
  // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  // '-'
  // 'M' | 'T' | 'N'
  teacherId: string;
  studentsIds?: string[];
}

type Entity = 'parent' | 'student' | 'teacher' | 'group';

export { Group, Parent, Student, Teacher, Entity, Allergies, Blood, Medicines };
