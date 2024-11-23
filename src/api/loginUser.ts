import { getDocs, query, where } from 'firebase/firestore';
import { usersCollection } from '../services/users';

export const getUser = async (username: string) => {
  const userQuery = query(usersCollection, where('username', '==', username));
  
  const userSnapshot = await getDocs(userQuery);
  const userFetched = userSnapshot.docs[0]?.data();
  return userFetched;
}

export const loginUser = async (username: string, password: string) => {
  const userQuery = query(usersCollection, where('username', '==', username), where('password', '==', password));
  
  const userSnapshot = await getDocs(userQuery);
  const userFetched = userSnapshot.docs[0]?.data();
  return userFetched;
}