import React from "react";
import useCounter from "../hooks/useCounter";
function Counter1() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <h2>Count 1:{count}</h2>
      <button onClick={increment}>Tăng</button>
      <button style={{ marginLeft: "20px" }} onClick={decrement}>
        Giảm
      </button>
    </div>
  );
}
export default Counter1;
