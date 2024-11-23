import { Button, Form, FormProps, Input, Typography } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../api/loginUser';
import { toast } from 'react-toastify';

type FieldType = {
  username?: string;
  password?: string;
};

interface ILoginPage {
  setUser: (user: any) => void;
}

export const LoginPage = (props: ILoginPage): ReactElement => {
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      navigate('/');
    }
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.username && values.password) {
      const fetchedUser = await loginUser(values.username, values.password);
      if (!fetchedUser) {
        setIsError(true);
        toast.error('Неверный логин или пароль');
        return;
      }

      localStorage.setItem('firstName', fetchedUser.firstName);
      localStorage.setItem('secondName', fetchedUser.secondName);
      localStorage.setItem('thirdName', fetchedUser.thirdName);
      localStorage.setItem('username', fetchedUser.username);
      toast.success('Вы вошли в систему');
      props.setUser(fetchedUser);
      navigate('/');
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        {isError && <Typography style={{ color: 'red' }}>Неверный логин или пароль</Typography>}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};