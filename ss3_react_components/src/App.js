import React, { useState } from "react";
function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");
  const handleChange = (even) => {
    setItem(even.target.value);
  };
  const handleAddItem = () => {
    const trimmedItem = item.trim();
    const isDuplicate = list.includes(trimmedItem);
    if (trimmedItem && !isDuplicate) {
      setList([...list, trimmedItem]);
      setItem("");
    } else if (isDuplicate) {
      alert("Công việc đã tồn tại");
    }
  };
  const handleDeleteItem = (index) => {
    const listDelete = list.filter((_, i) => i !== index);
    setList(listDelete);
  };
  return (
    <div style={{ marginLeft: "40%" }}>
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
          <li key={index} style={{ marginTop: "10px", display: "flex" }}>
            <span>{todo}</span>
            <button
              onClick={() => handleDeleteItem(index)}
              style={{ marginLeft: "10px", padding: "5px 10px" }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
