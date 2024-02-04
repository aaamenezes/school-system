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
  class: Class;
}

interface Teacher {
  name: string;
  lastName: string;
  document: string;
  phone: string;
  email: string;
  hiringDate: string;
  specialization: string;
  classes: Class[];
}

interface Class {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  shift: 'M' | 'T' | 'N';
  teacher: Teacher;
  students?: Student[];
}

export { Class, Parent, Student, Teacher };
