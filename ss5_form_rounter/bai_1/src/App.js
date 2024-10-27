import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./App.css";
function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleValidate = yup.object().shape({
    name: yup
      .string()
      .required("không được trống")
      .min(7, "không được nhỏ hơn 7 ký tự"),
    email: yup
      .string()
      .email("địa chỉ không hop lệ")
      .required("không được trống"),
    phone: yup
      .string()
      .required("không được trống")
      .length(9, "Gồm đúng 9 chữ số")
      .matches(/^\d+$/, "Chỉ được nhập số"),
    message: yup.string().max("tối đa 20 ký tự"),
  });
  return (
    <>
      <Formik initialValues={form} validationSchema={handleValidate}>
        <Form className="form-container">
          <label>Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className="error-message" />

          <label>Email</label>
          <Field type="text" name="email" />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />

          <label>Phone</label>
          <Field type="text" name="phone" />
          <ErrorMessage
            name="phone"
            component="div"
            className="error-message"
          />

          <label>Message</label>
          <Field type="text" name="message" />
          <ErrorMessage
            name="message"
            component="div"
            className="error-message"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}
export default App;
