// import store from "../slices/index.js";
import { db } from "./init";
// import { actions } from "../slices/chatSlice.js";
import { collection } from "firebase/firestore";
// import { toast } from "react-toastify";
// import i18next from "i18next";
// import { usersCollection } from "./users.js";
// import { v4 } from "uuid";

export const studentsCollection = collection(db, "students");