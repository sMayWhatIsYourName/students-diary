import { Typography, Select } from "antd";
import { useState } from "react";
import { TableGrade } from "../components/TableGrade";
import { IStudent } from "../types";

interface IEditGrade {
  students: Array<IStudent>;
}

export const EditGrade = (props: IEditGrade): JSX.Element | null => {
  const [chosenStudent, setChosenStudent] = useState<string | null>(null);

  if (props.students.length === 0) {
    return <Typography>Добавьте студента</Typography>;
  }

  const students = props.students.map(({ firstName, id, secondName, thirdName }) => ({ value: id, label: `${secondName} ${firstName} ${thirdName}` }));
  const chosenStudentItem = props.students.find((val) => val.id === chosenStudent);

  return (
    <>
      <Select onChange={(val) => setChosenStudent(val)} style={{ width: '50%' }} placeholder="Выберите студента" options={students} />
      {chosenStudentItem && <>
        <Typography>Пол: {chosenStudentItem.sex === 'male' ? 'Мужской' : 'Женский'}</Typography>
        <Typography>Номер зачетной книжки: {chosenStudentItem.diary}</Typography>
        <Typography>Паспортные данные: {chosenStudentItem.passport}</Typography>
        <Typography>Номер группы: {chosenStudentItem.groupNumber}</Typography>
        <Typography>Специальность: {chosenStudentItem.specialization}</Typography>
        <Typography>Дата рождения: {chosenStudentItem.birthDay}</Typography>
      </>}
      {chosenStudentItem && <TableGrade chosenStudentItem={chosenStudentItem} />}
    </>
  );
};