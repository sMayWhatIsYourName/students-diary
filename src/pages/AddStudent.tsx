import { Button, Form, FormProps, Input, Typography, DatePicker, Select } from 'antd';
import { addStudent } from '../api/students';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type FieldType = {
  secondName: string;
  firstName: string;
  thirdName: string;
  birthDay: any;
  sex: string;
  passport: string;
  diary: string;
  specialization: string;
  groupNumber: number;
};


const { Option } = Select;

export const AddStudent = (): JSX.Element => {
  const navigate = useNavigate();
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { birthDay } = values;
    const token = uuidv4();
    const birthDayFormatted = `${birthDay['$y']}-${birthDay['$M']}-${birthDay['$D']}`
    const data = {
      secondName: values.secondName,
      firstName: values.firstName,
      thirdName: values.thirdName,
      birthDay: birthDayFormatted,
      sex: values.sex,
      passport: values.passport,
      diary: values.diary,
      specialization: values.specialization,
      groupNumber: values.groupNumber,
      months: JSON.stringify([[], [], [], [], [], [], [], [], []]),
      id: token
    };
  
    addStudent(data, token);
    navigate('/');
    toast.success('Вы добавили студента');
  };
  return (
    <>
      <Typography style={{ 'fontSize': '32px' }}>Добавление студента</Typography>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        clearOnDestroy={true}
      >
        <Form.Item<FieldType>
          label="Фамилия"
          name="secondName"
          rules={[{ required: true, message: 'Введите фамилию!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите имя!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Отчество"
          name="thirdName"
          rules={[{ required: true, message: 'Введите отчество!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Дата рождения"
          name="birthDay"
          rules={[{ required: true, message: 'Введите дату рождения!' }]}
        >
          <DatePicker placeholder='Выберите дату' />
        </Form.Item>
        <Form.Item<FieldType>
          label="Пол"
          name="sex"
          rules={[{ required: true, message: 'Выберите пол!' }]}
        >
          <Select placeholder="Выберите пол">
            <Option value="male">Мужской</Option>
            <Option value="female">Женский</Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="Паспортные данные"
          name="passport"
          rules={[{ required: true, message: 'Введите паспортные данные!' }]}
        >
          <Input.OTP length={10} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Номер зачетной книжки"
          name="diary"
          rules={[{ required: true, message: 'Введите номер зачетной книжки!' }]}
        >
          <Input.OTP length={8} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Специальность"
          name="specialization"
          rules={[{ required: true, message: 'Введите специальность!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Номер учебной группы"
          name="groupNumber"

          rules={[{ required: true, message: 'Введите номер учебной группы!', }]}
        >
          <Input.OTP length={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Button type='dashed' htmlType='reset'>
          Очистить форму
        </Button>
      </Form >
    </>

  );
};