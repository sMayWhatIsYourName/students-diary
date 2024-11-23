import { doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { studentsCollection } from '../services/students';
import { db } from '../services/init';
export const fetchStudents = async (setStudents: Function) => {
  const studentsQuery = query(studentsCollection);

  onSnapshot(studentsQuery, async (querySnapshot) => {
    setStudents(querySnapshot.docs.map((item) => item.data()));
  });
  
  const studentsSnapshot = await getDocs(studentsQuery);

  if (studentsSnapshot.docs.length === 0) {
    return [];
  }
  
  const studentsFetched = studentsSnapshot.docs.map((item) => item.data());
  
  return studentsFetched;
};

export const addStudent = async (value, token: string) => {
  await setDoc(doc(db, 'students', token), value);
};

export const updateStudent = async (value) => {
  await setDoc(doc(db, 'students', value.id), value);
};