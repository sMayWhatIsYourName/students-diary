import { Button, Typography } from "antd";
import { ReactElement, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { UserContext } from "../store/users";
import { toast } from "react-toastify";

export const Layout = (): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { firstName, secondName, thirdName } = useContext(UserContext);

  const navToMain = () => navigate('/');

  const exit = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('secondName');
    localStorage.removeItem('thirdName');
    navigate('/login');
    toast.success('Вы вышли из системы');
  };

  return (
    <>
      {pathname !== '/login' &&
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {pathname !== '/' && <Button onClick={navToMain}>Назад</Button>}
          <Typography>{firstName} {secondName} {thirdName}</Typography>
          <Button onClick={exit}>Выйти</Button>
        </div>}
      <Outlet />
    </>
  );
};