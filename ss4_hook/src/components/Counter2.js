import React from "react";
import useCounter from "../hooks/useCounter";
function Counter2() {
  const { count, increment2, decrement2 } = useCounter(0);
  return (
    <div>
      <h2>Count 2:{count}</h2>
      <button onClick={increment2}>Tăng2</button>
      <button style={{ marginLeft: "20px" }} onClick={decrement2}>
        Giảm2
      </button>
    </div>
  );
}
export default Counter2;
