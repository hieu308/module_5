import React from "react";
import { Form, Button } from 'react-bootstrap';
import{useNavigate} from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form as FormikForm ,ErrorMessage} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup"; // Import Yup

function AddBook() {
    const navigate = useNavigate();
    const [books, setBooks] = React.useState([]); // State để lưu trữ danh sách sách
    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3010/book");
                setBooks(response.data); // Cập nhật state với dữ liệu sách
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);
    const [book, setBook] = React.useState({
        nameBook:"",
        quantity:""
    });
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
    const handleSubmit = async (values) => {
        const isDuplicate = books.some(book => book.nameBook === values.nameBook);

        if (isDuplicate) {
            toast.error('Tên sách đã tồn tại. Vui lòng nhập tên sách khác.');
            return;
        }
        try {

            const response = await axios.post("http://localhost:3010/book", values);
            toast.success('Thêm mới thành công.');
            navigate("/list");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center mb-4">Thêm Sách Mới</h2>
            <Formik
                validationSchema={validationSchema}
                initialValues={book}
                onSubmit={handleSubmit}
            >
                {() => (
                    <FormikForm>
                        <Form.Group className="mb-3" >
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

                        <Form.Group className="mb-3" >
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

                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
}

export default AddBook;
