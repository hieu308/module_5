// EditBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {toast} from "react-toastify";
import * as Yup from "yup"; // Import Yup

function EditBook() {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id từ URL
    const [book, setBook] = useState({ nameBook: '', quantity: '' });

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`http://localhost:3010/book/${id}`);
                setBook(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3010/book/${id}`, book);
            toast.success('chỉnh sửa thành công thành công.');

            navigate(`/list`)
        } catch (error) {
            toast.error('chỉnh sửa thất bại');

            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sửa Sách</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBookName">
                    <Form.Label>Tên Sách</Form.Label>
                    <Form.Control
                        type="text"
                        name="nameBook"
                        value={book.nameBook}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBookQuantity">
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Lưu
                </Button>
            </Form>
        </div>
    );
}

export default EditBook;
