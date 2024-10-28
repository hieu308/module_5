import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Table,Modal , Button,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import { Formik, Field, Form as FormikForm,ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup

function ListBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bookToEdit, setBookToEdit] = useState({ nameBook: "", quantity: "" });
    useEffect(() => {
        async function getBooks() {
            try {
                const response = await axios.get("http://localhost:3010/book");
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getBooks();
    }, []);
    const validationSchema = Yup.object().shape({
        nameBook: Yup.string()
            .min(2, 'Tên sách phải có ít nhất 2 ký tự.')
            .max(20, 'Tên sách không được vượt quá 20 ký tự.')
            .required('Tên sách là bắt buộc.'),
        quantity: Yup.number()
            .min(2, 'Số lượng phải lớn hơn 1.')
            .max(1000, 'Số lượng không được vượt quá 1000.')
            .required('Số lượng là bắt buộc.')
    });
    const handleEditClick = (book) => {
        setBookToEdit({ nameBook: book.nameBook, quantity: book.quantity, id: book.id });
        setShowEditModal(true);
        // navigate(`/edit/${book.id}`);
    };
    const handleConfirmEdit = async (values) => {
        const isDuplicate = books.some(book => book.nameBook === values.nameBook && book.id !== bookToEdit.id);

        if (isDuplicate) {
            toast.error('Tên sách đã tồn tại. Vui lòng nhập tên sách khác.');
            return; // Thoát hàm nếu có trùng lặp
        }
        try {
            const response = await axios.put(`http://localhost:3010/book/${bookToEdit.id}`, values);
            setBooks(books.map(book => book.id === bookToEdit.id ? response.data : book));
            toast.success('chỉnh sửa thành công thành công.');
        } catch (error) {
            console.log(error);
        } finally {
            setShowEditModal(false);
        }
    };
    const handleDeleteClick = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        setShowDeleteModal(false)
        try {
            await axios.delete(`http://localhost:3010/book/${bookToDelete.id}`);
            setBooks(books.filter((book) => book.id !== bookToDelete.id));
            toast.success('xoá thành công.');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>

            <div className="container mt-5">
                <h2 className="text-center mb-4">Book List</h2>


                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.nameBook}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditClick(book)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(book)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal show={showDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác Nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa sách "{bookToDelete?.nameBook}" không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa Sách</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            validationSchema={validationSchema}

                            initialValues={bookToEdit}
                            onSubmit={handleConfirmEdit}
                        >
                            {() => (
                                <FormikForm>
                                    <Form.Group className="mb-3" controlId="formBookName">
                                        <Form.Label>Tên Sách</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            type="text"
                                            placeholder="Nhập tên sách"
                                            name="nameBook"
                                        />
                                        <ErrorMessage
                                            name="nameBook"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBookQuantity">
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Field
                                            as={Form.Control}
                                            type="number"
                                            placeholder="Nhập số lượng"
                                            name="quantity"
                                        />
                                        <ErrorMessage
                                            name="quantity"
                                            component="div"
                                            className="error-message"
                                        />

                                    </Form.Group>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                            Hủy
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Lưu
                                        </Button>
                                    </Modal.Footer>
                                </FormikForm>
                            )}
                        </Formik>
                    </Modal.Body>

                </Modal>
            </div></>

    );
}

export default ListBooks;