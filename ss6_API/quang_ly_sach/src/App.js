import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListBooks from "./components/Books";  // Đảm bảo đặt tên đúng
import AddBook from "./components/Add";  // Giả sử bạn có component này
import HeaderComponent from "./components/HeaderComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from "./components/Edit";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path="/list" element={<ListBooks />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit/:id" element={<EditBook />} />
            </Routes>
            <ToastContainer/>

        </BrowserRouter>
    );
}

export default App;
