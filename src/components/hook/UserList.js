import React from "react";
import { Card, Table, Button } from "antd";

function UserList(props) {
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tài khoản", dataIndex: "username" },
    { title: "Họ tên", dataIndex: "name" },
    { title: "Số điện thoại", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Mã loại người dùng", dataIndex: "role" },
    {
      title: "",
      key: "action",
      render: (_, user) => {
        return (
          <>
            <Button onClick={() => props.getUpdateUser(user)} type="primary">
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

  return (
    <Card
      title="Danh sách người dùng"
      headStyle={{
        backgroundColor: "#34495e",
        color: "#ffffff",
      }}
    >
      <Table
        dataSource={props.users.map((user) => {
          return { ...user, key: user.id };
        })}
        columns={columns}
      />
    </Card>
  );
}

export default UserList;
