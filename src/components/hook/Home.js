import React, { useEffect, useState } from "react";
import Form from "./Form";
import UserList from "./UserList";

function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  //   const userList = [
  //     {
  //       id: 1,
  //       key: 1,
  //       userName: "hungdn",
  //       name: "HungDN",
  //       phone: "0987932899",
  //       email: "hungdn11895@gmail.com",
  //       role: "quanTri",
  //     },
  //     {
  //       id: 2,
  //       key: 2,
  //       userName: "anhnt",
  //       name: "AnhNT",
  //       phone: "0945645311",
  //       email: "anhnt@gmail.com",
  //       role: "khachHang",
  //     },
  //   ];
  //   useEffect(() => {
  //     console.log("didmount ");

  //     return () => {
  //       console.log("willUnmount");
  //     };
  //   }, []);

  //   useEffect(() => {
  //     console.log("did update");
  //   }, [userList]);

  function createUser(user) {
    const foundUser = userList.find((item) => {
      return item.username === user.name;
    });
    if (foundUser) return alert("Tài khoản đã tồn tại");

    setUserList([...userList, user]);
  }

  function deleteUser(id) {
    const cloneUserList = [...userList];
    const index = cloneUserList.findIndex((user) => user.id === id);
    if (index === -1) return;
    cloneUserList.splice(index, 1);

    setUserList(cloneUserList);
  }

  function getUpdateUser(user) {
    setSelectedUser(user);
  }

  function updateUser(user) {
    const cloneUserList = [...userList];
    const index = cloneUserList.findIndex((item) => item.id === user.id);
    if (index === -1) return;
    cloneUserList[index] = user;

    setUserList(cloneUserList);
    setSelectedUser(null);
  }

  return (
    <div>
      <h1 className="mt-2 text-center">Quản Lý User</h1>
      <Form selectedUser={selectedUser} createUser={createUser} updateUser={updateUser} />
      <UserList getUpdateUser={getUpdateUser} deleteUser={deleteUser} users={userList} />
    </div>
  );
}

// Install ant design

export default Home;
