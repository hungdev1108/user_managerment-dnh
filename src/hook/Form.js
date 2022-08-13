import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./form.module.css";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
  masv: yup.string().required("*Vui lòng nhập mã sinh viên"),
  name: yup
    .string()
    .required("*Vui lòng nhập name")
    .matches(
      /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/g,
      "Họ tên phải nhập chữ"
    ),
  email: yup
    .string()
    .required("*Vui lòng nhập email")
    .email("*Email không đúng định dạng"),
  phone: yup
    .string()
    .required("*Vui lòng nhập phone")
    .matches(/^[0-9]+$/g, "Số điện thoại phải nhập số"),
});

function Form(props) {
  const [user, setUser] = useState({
    masv: "",
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!props.selectedUser) return;
    if (props.selectedUser.masv === user.masv) return;

    setUser(props.selectedUser);
  }, [props.selectedUser]); //eslint-disable-line

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
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

    resetForm();

    errors.masv = "";
    errors.name = "";
    errors.phone = "";
    errors.email = "";
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
      masv: "",
      password: "",
      name: "",
      email: "",
      phone: "",
    });
  }

  return (
    <Card
      title="Thông tin sinh viên"
      headStyle={{
        backgroundColor: "#34495e",
        color: "#ffffff",
        fontSize: "22px",
      }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Mã SV</label>
          <Input
            name="masv"
            value={user.masv}
            onChange={handleChange}
            prefix={<UserOutlined />}
            placeholder="Mã Sinh Viên"
          />
          <span style={{ color: "red" }}>{errors.masv}</span>
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

        <div className={styles.btn}>
          <Button
            className="btn btn-success"
            htmlType="submit"
            style={{
              fontSize: 15,
              paddingBottom: 28,
            }}
          >
            Thêm sinh viên
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
