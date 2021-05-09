import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Space, Tag } from "antd";

function Panel() {
  let history = useHistory();

  if (!localStorage.token) history.push("/login");
  const UNAUTHORIZED = 401;
  const FORBIDDEN = 403;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response;
      if (status === UNAUTHORIZED) {
        history.push("/login");
        localStorage.removeItem("token");
      } else if (status === FORBIDDEN) {
        history.push("/panel");
      }
      return Promise.reject(error);
    }
  );

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Piece",
      dataIndex: "piece",
      key: "piece",
      render: (tag) => (
        <Tag color={"geekblue"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Starting Case",
      dataIndex: "startingCase",
      key: "startingCase",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Manage {record.name}</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      username: "cr105ph1nx",
      piece: "Queen",
      startingCase: "OpenMindsClub",
    },
    {
      key: "2",
      username: "serinir",
      piece: "Bishop",
      startingCase: "Orbis",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default Panel;
