import './App.css'
import { Routes, Route, useNavigate } from "react-router";
import { LoginPage } from './pages/Login';
import { Layout } from './pages/Layout';
import { IndexPage } from './pages/Index';
import { AddStudent } from './pages/AddStudent';
import { EditGrade } from './pages/EditGrade';
import { initialUserContext, IUserContext, UserContext } from './store/users';
import { useEffect, useState } from 'react';
import { getUser } from './api/loginUser';
import { fetchStudents } from './api/students';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState<IUserContext>(initialUserContext);
  const [students, setStudents] = useState<Array<any>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user.username) {
        navigate('/login');
        return;
      }

      const fetchedUser = await getUser(user.username)

      if (!fetchedUser) {
        navigate('/login');
        return;
      }
      setUser({
        firstName: fetchedUser.firstName,
        secondName: fetchedUser.secondName,
        thirdName: fetchedUser.thirdName,
        username: fetchedUser.username,
      });
      localStorage.setItem('firstName', fetchedUser.firstName);
      localStorage.setItem('secondName', fetchedUser.secondName);
      localStorage.setItem('thirdName', fetchedUser.thirdName);
      localStorage.setItem('username', fetchedUser.username);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      const students = await fetchStudents(setStudents);
      setStudents(students);
    };

    asyncFn();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="add" element={<AddStudent />} />
            <Route path="grades" element={<EditGrade students={students} />} />
            <Route path="login" element={<LoginPage setUser={setUser} />} />
          </Route>
        </Routes>
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
