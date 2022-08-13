import React, { useState } from "react";
import { Card, Table, Button, Input } from "antd";

const { Search } = Input;

function UserList(props) {
  const userList = props.users;

  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const columns = [
    { title: "Mã SV", dataIndex: "masv" },
    { title: "Họ tên", dataIndex: "name" },
    { title: "Số điện thoại", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },

    {
      title: "",
      key: "action",
      render: (_, user) => {
        return (
          <>
            <Button
              className="mx-2"
              onClick={() => props.getUpdateUser(user)}
              type="primary"
            >
              Chỉnh sửa
            </Button>
            <Button onClick={() => props.deleteUser(user.id)} type="danger">
              Xóa
            </Button>
          </>
        );
      },
    },
  ];

  const handleFilterChange = (e) => {
    const data = [...userList];

    console.log(data);

    const value = e.target.value;
    if (value === "") {
      setIsSearch(false);
      return;
    } else {
      setIsSearch(true);
    }

    const searchResult = data.filter((item) => item.name.toLowerCase().includes(value));
    setSearchResult(searchResult);
    console.log(searchResult);
  };

  return (
    <Card
      title="Danh sách sinh viên"
      headStyle={{
        backgroundColor: "#34495e",
        color: "#ffffff",
        fontSize: 22,
      }}
    >
      <Search
        placeholder="Tìm kiếm"
        allowClear
        enterButton="Search"
        size="large"
        onChange={handleFilterChange}
        style={{
          width: 400,
          marginBottom: 24,
        }}
      />
      <Table
        dataSource={
          isSearch
            ? searchResult
            : userList.map((user) => {
                console.log(user.id);
                return { ...user, key: user.id };
              })
        }
        columns={columns}
      />
    </Card>
  );
}

export default UserList;
