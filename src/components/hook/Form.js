import React, { useEffect, useState } from "react";
import { Card, Input, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./form.module.css";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
  username: yup.string().required("*Vui lòng nhập username"),
  password: yup
    .string()
    .required("*Vui lòng nhập password")
    .min(8, "*Nhập ít nhất 8 ký tự")
    .max(16, "*Nhập tối đa 16 ký tự"),
  name: yup
    .string()
    .required("*Vui lòng nhập name")
    .matches(/^[A-Za-z ]+$/g, "Họ tên phải nhập chữ"),
  email: yup
    .string()
    .required("*Vui lòng nhập email")
    .email("*Email không đúng định dạng"),
  phone: yup
    .string()
    .required("*Vui lòng nhập phone")
    .matches(/^[0-9]+$/g, "Số điện thoại phải nhập số"),
  role: yup.string().required("*Vui lòng chọn mã loại người dùng"),
});

function Form(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!props.selectedUser) return;
    if (props.selectedUser.id === user.id) return;

    setUser(props.selectedUser);
  }, [props.selectedUser]); //eslint-disable-line

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSelect(name, val) {
    setUser({ ...user, [name]: val });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    if (props.selectedUser) {
      props.updateUser(user);
    } else {
      props.createUser({ ...user, id: uuidv4() });
    }

    setUser({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  }

  // Validation
  async function validateForm() {
    const validationErrors = {};
    try {
      await userSchema.validate(user, { abortEarly: false });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationError) => {
        if (validationErrors[validationError.path]) return;
        validationErrors[validationError.path] = validationError.message;
      });

      setErrors(validationErrors);
    }
    return isEmpty(validationErrors);
  }

  function resetForm() {
    setUser({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  }

  return (
    <Card
      title="Form Đăng ký"
      headStyle={{
        backgroundColor: "#34495e",
        color: "#ffffff",
      }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Tài khoản</label>
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
            prefix={<UserOutlined />}
            placeholder="Tài khoản"
          />
          <span style={{ color: "red" }}>{errors.username}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Họ tên</label>
          <Input
            name="name"
            value={user.name}
            onChange={handleChange}
            prefix={<UserOutlined />}
            placeholder="Họ tên"
          />
          <span style={{ color: "red" }}>{errors.name}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Mật khẩu</label>
          <Input
            name="password"
            value={user.password}
            onChange={handleChange}
            prefix={<UserOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
          <span style={{ color: "red" }}>{errors.password}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Số điện thoại</label>
          <Input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            prefix={<UserOutlined />}
            placeholder="Số điện thoại"
          />
          <span style={{ color: "red" }}>{errors.phone}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <Input
            name="email"
            value={user.email}
            onChange={handleChange}
            prefix={<UserOutlined />}
            type="email"
            placeholder="Email"
          />
          <span style={{ color: "red" }}>{errors.email}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Mã loại người dùng</label>
          <Select
            value={user.role}
            onChange={(val) => {
              handleSelect("role", val);
            }}
            className={styles.select}
          >
            <Select.Option value="khachHang">Khách hàng</Select.Option>
            <Select.Option value="quanTri">Quản trị viên</Select.Option>
          </Select>
          <span style={{ color: "red" }}>{errors.role}</span>
        </div>

        <div className={styles.btn}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button onClick={resetForm} type="default">
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
