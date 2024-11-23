import { Typography, Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { TableGrade } from "../components/TableGrade";

interface IStudent {
  id: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  months: Array<Array<number | null>>;
};


const data: Array<IStudent> = [
  // {
  //   firstName: 'Степанов',
  //   secondName: 'Дмитрий',
  //   thirdName: 'Альбертович',
  //   id: '228',
  //   months: [[2, 4, null, 3, 4, 3, 2, 4, null], [3, 4, 5], [4], [], [2], [3], [], [5], [5]]
  // },
  // {
  //   firstName: 'Канчурин',
  //   secondName: 'Альберт',
  //   thirdName: 'Альмирович',
  //   id: '1337',
  //   months: [[2], [], [4], [5], [2], [], [4], [5], [3]]
  // },
];

interface IEditGrade {
  students: Array<any>;
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