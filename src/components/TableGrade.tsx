import { Button, Input, Typography } from "antd";
import { useEffect, useRef } from "react";
import { updateStudent } from "../api/students";
import { IStudent } from "../types";

interface ITableGrade {
  chosenStudentItem: IStudent;
}


export const TableGrade = ({ chosenStudentItem }: ITableGrade): JSX.Element => {
  const chosenStudentId = useRef(chosenStudentItem.id);
  const monthsOfYear = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'];
  const subjects = ['Математика', 'Информатика', 'Физкультура', 'История', 'Обществознание', 'География', 'Труд', 'Русский язык', 'Литература'];
  const months: Array<Array<number | null>> = JSON.parse(chosenStudentItem.months);
  const monthState = useRef<Array<Array<number | null>>>(months);

  const handleMonthsState = (subject: number, month: number) => (value: string[]) => {
    const newValue = value.length === 0 ? null : +value;
    const newMonths: Array<Array<number | null>> = [];
    monthState.current.forEach((months) => {
      newMonths.push([...months])
    });
    newMonths[subject][month] = newValue;
    monthState.current = newMonths;
  };

  const saveGrades = () => {
    const data = {
      ...chosenStudentItem,
      months: JSON.stringify(monthState.current)
    };
    updateStudent(data);
  };

  useEffect(() => {
    if (chosenStudentItem.id !== chosenStudentId.current) {
      monthState.current = months;
      chosenStudentId.current = chosenStudentItem.id;
    }
  }, [chosenStudentItem]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th><Typography>Предметы</Typography></th>
            <th><Typography>Сентябрь</Typography></th>
            <th><Typography>Октябрь</Typography></th>
            <th><Typography>Ноябрь</Typography></th>
            <th><Typography>Декабрь</Typography></th>
            <th><Typography>Январь</Typography></th>
            <th><Typography>Февраль</Typography></th>
            <th><Typography>Март</Typography></th>
            <th><Typography>Апрель</Typography></th>
            <th><Typography>Май</Typography></th>
          </tr>
        </thead>
        <tbody>
          {months.map((_arr, i) =>
            <tr key={monthsOfYear[i] + chosenStudentItem.id}>
              <th><Typography>{subjects[i]}</Typography></th>
              <td><Input.OTP onInput={handleMonthsState(i, 0)} value={`${months[i][0] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 1)} value={`${months[i][1] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 2)} value={`${months[i][2] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 3)} value={`${months[i][3] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 4)} value={`${months[i][4] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 5)} value={`${months[i][5] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 6)} value={`${months[i][6] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 7)} value={`${months[i][7] || ''}`} length={1} /></td>
              <td><Input.OTP onInput={handleMonthsState(i, 8)} value={`${months[i][8] || ''}`} length={1} /></td>
            </tr>
          )}
        </tbody>
      </table>
      <Button onClick={saveGrades}>Сохранить</Button>
    </>
  );
};