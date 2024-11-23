import { List, Typography } from "antd";
import { useNavigate } from "react-router";

interface IListItemNavigationProps {
  name: string;
  link: string;
}

const ListItemNavigation = (props: IListItemNavigationProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Typography.Text onClick={() => navigate(props.link)}>{props.name}</Typography.Text>
  );
};

const data: Array<JSX.Element> = [
  <ListItemNavigation name="Добавление студентов" link="/add" />,
  <ListItemNavigation name="Просмотр успеваемости" link="/grades" />,
];
export const IndexPage = (): JSX.Element => {
  return (
    <>
      <List
        bordered
        dataSource={data}
        renderItem={(item: JSX.Element) => (
          <List.Item>{item}</List.Item>
        )}
    />
    </>
  );
};