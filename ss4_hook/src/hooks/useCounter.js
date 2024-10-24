import React, { useState } from "react";
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const increment2 = () => setCount(count + 2);
  const decrement2 = () => setCount(count - 2);
  return { count, increment, increment2, decrement, decrement2 };
}
export default useCounter;
