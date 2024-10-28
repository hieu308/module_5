import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

function Todo() {
    const [list, setList] = useState([]);
    const [item, setItem] = useState("");
    useEffect(() => {
        async function getList() {
            try {
                const respone = await axios.get('http://localhost:3090/listTodo');
                setList(respone.data);
                console.log(list)
            } catch (err) {
                console.log(err);
            }
        }

        getList()
    }, [])
    const handleChange = (even) => {
        setItem(even.target.value);
    };
    const handleAddItem = async (event) => {
        event.preventDefault();
        const trimmedItem = item.trim();
        const isDuplicate = list.includes(trimmedItem);

        if (trimmedItem && !isDuplicate) {
            try {
                const response = await axios.post(
                    'http://localhost:3090/listTodo',
                    { title: trimmedItem }
                );
                setList(prevList => [...prevList, response.data]);
                setItem("");
                toast.success('Thêm mới thành công.');
            } catch (err) {
                console.error("Lỗi:", err);
                toast.error("lỗi xãy ra")
            }
        } else if (isDuplicate) {
            alert("Công việc đã tồn tại");
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3090/listTodo/${id}`)
            const listDelete = list.filter(todo => todo.id !== id);
            setList(listDelete);
            toast.success('Xoá thành công.');
        } catch (err) {
            console.log(err);
            toast.error('xoá không thành công')
        }

    };
    return (
        <div style={{marginLeft: "40%"}}>
            <h1>To do list</h1>
            <input
                type="text"
                value={item}
                onChange={handleChange}
                placeholder="Nhập công việc ..."
            ></input>
            <button onClick={handleAddItem}>Thêm</button>
            <ul>
                {list.map((todo, index) => (
                    <li
                        key={index}
                        style={{
                            marginLeft: "-5%",
                            marginTop: "10px",
                            display: "flex",
                            width: "27%",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{todo.title}</span>
                        <button
                            onClick={() => handleDeleteItem(todo.id)}
                            style={{marginLeft: "10px", padding: "5px 10px"}}
                        >
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>

        </div>

    );
}
export default Todo;