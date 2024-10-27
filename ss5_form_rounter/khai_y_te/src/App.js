import React, { useState } from "react";
import "./App.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function App() {
  const [form, setForm] = useState({
    name: "",
    cmnd: "",
    birthDay: "",
    gender: "",
    international: "",
    companyWork: "",
    department: "",
    hasInsuranceCard: false,
    city: "",
    district: "",
    ward: "",
    number: "",
    phone: "",
    email: "",
  });
  const handleValidate = yup.object().shape({
    name: yup.string().required("không được trống"),
    cmnd: yup.string().required("không được trống"),
    birthDay: yup
      .number()
      .required("không được trống")
      .min(1990, "từ năm 1900 trở lên"),
    international: yup.string().required("không được trống"),
    district: yup.string().required("không được trống"),
    ward: yup.string().required("không được trống"),
    number: yup.number().required("không được trống"),
    phone: yup.string().required("không được trống"),
    email: yup
      .string()
      .required("không được trống")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
        "không đúng định dạng"
      ),
  });
  return (
    <>
      <Formik initialValues={form} validationSchema={handleValidate}>
        <div className="container">
          <h1>Thông Tin Đăng Ký</h1>
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Số CMND/hộ chiếu</label>
              <Field type="text" name="cmnd" />
              <ErrorMessage
                name="cmnd"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Năm sinh</label>
              <Field type="number" name="birthDay" />
              <ErrorMessage
                name="birthDay"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Giới tính</label>
              <div>
                <label>
                  <Field type="radio" name="gender" value="male" />
                  Nam
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Nữ
                </label>
              </div>
            </div>
            <div>
              <label>Quốc tịch</label>
              <Field type="text" name="international" />
              <ErrorMessage
                name="international"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label>Công ty làm việc</label>
              <Field type="text" name="companyWork" />
            </div>
            <div>
              <label>Bộ phận làm việc</label>
              <Field type="text" name="department" />
            </div>
            <div className="form-group">
              <label>Có thẻ bảo hiểm y tế</label>
              <div>
                {" "}
                <Field
                  type="checkbox"
                  name="hasInsuranceCard"
                  className="check2"
                />
              </div>
            </div>
            <h1>Địa chỉ liên lạc tại Việt Nam</h1>
            <div>
              <label>Tỉnh thành</label>
              <Field type="text" name="city" />
            </div>
            <div>
              <label>Quận/huyện</label>
              <Field type="text" name="district" />
            </div>
            <div>
              <label>Phường/Xã</label>
              <Field type="text" name="ward" />
            </div>
            <div>
              <label>Số nhà, phố, tổ dân phố/thôn/đội</label>
              <Field type="text" name="number" />
            </div>
            <div>
              <label>Điện thoại</label>
              <Field type="text" name="phone" />
            </div>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default App;
