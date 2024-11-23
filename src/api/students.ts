import { doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { studentsCollection } from '../services/students';
import { db } from '../services/init';
import { IStudent } from '../types';
export const fetchStudents = async (setStudents: (students: Array<IStudent>) => void): Promise<IStudent[]> => {
  const studentsQuery = query(studentsCollection);

  onSnapshot(studentsQuery, async (querySnapshot) => {
    setStudents(querySnapshot.docs.map((item) => item.data()) as Array<IStudent>);
  });
  
  const studentsSnapshot = await getDocs(studentsQuery);

  if (studentsSnapshot.docs.length === 0) {
    return [];
  }
  
  const studentsFetched = studentsSnapshot.docs.map((item) => item.data()) as unknown as Array<IStudent>;
  
  return studentsFetched;
};

export const addStudent = async (value: IStudent, token: string) => {
  await setDoc(doc(db, 'students', token), value);
};

export const updateStudent = async (value: IStudent) => {
  await setDoc(doc(db, 'students', value.id), value);
};