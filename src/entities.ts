interface Parent {
  name?: string;
  lastName: string;
  phones: string[];
  emails: string[];
  addresses: { street: string; number: number; city: string }[];
  document?: string;
  kids: Student[];
}

interface Student {
  name: string;
  lastName: string;
  birthDay: string;
  parents: Parent[];
  allergy?: string[];
  blood: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  medicines?: string[];
  registrationDate: string;
  document?: string;
  groups: Group;
}

interface Teacher {
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization: string;
  groups: Group[];
}

interface Group {
  code: string;
  // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  // '-'
  // 'M' | 'T' | 'N'
  teacher: Teacher;
  students?: Student[];
}

type Entity = 'parent' | 'student' | 'teacher' | 'group';

export { Group, Parent, Student, Teacher, Entity };
