import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageStudent() {
  const [studentList, setStudentList] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (editingIndex !== null) {
      const updatedList = [...studentList];
      updatedList[editingIndex] = form;
      setStudentList(updatedList);
    } else {
      setStudentList([...studentList, form]);
    }

    setForm({ name: "", phone: "", email: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setForm(studentList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedList = studentList.filter((_, i) => i !== editingIndex);
    setStudentList(updatedList);
    setShowModal(false);
    setEditingIndex(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Danh sách sinh viên</h1>

      <Form className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Tên:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Số điện thoại:</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          {editingIndex !== null ? "Cập nhật" : "Thêm"}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(index)}
                >
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sinh viên này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageStudent;
