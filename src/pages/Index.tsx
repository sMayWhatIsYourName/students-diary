import { ReactElement } from "react";
import { Divider, List, Typography } from "antd";
import { NavigateFunction, useNavigate } from "react-router";

// const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
//   <Flex justify="center" align="center" style={{ height: '100%' }}>
//     <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
//       {props.text}
//     </Typography.Title>
//   </Flex>
// );

// const CustomSplitter: React.FC<Readonly<SplitterProps>> = ({ style, ...restProps }) => (
//   <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', ...style }} {...restProps}>
//     <Splitter.Panel >
//       <Desc text="Добавление студентов" />
//     </Splitter.Panel>
//     <Splitter.Panel>
//       <Desc text="Заполнение успеваемости" />
//     </Splitter.Panel>
//     <Splitter.Panel>
//       <Desc text="Просмотр успеваемости" />
//     </Splitter.Panel>
//   </Splitter>
// );

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