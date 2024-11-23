import { createContext } from "react";

export const initialUserContext = {
  username: localStorage.getItem('username') || null,
  firstName: localStorage.getItem('firstName') || null,
  secondName: localStorage.getItem('secondName') || null,
  thirdName:localStorage.getItem('thirdName') || null,
};

export interface IUserContext {
  username: string | null;
  firstName: string | null;
  secondName: string | null;
  thirdName: string | null;
}

export const UserContext = createContext<IUserContext>(initialUserContext);