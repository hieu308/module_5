import logo from "./logo.svg";
import "./App.css";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";

function App() {
  return (
    <div style={{ margin: "0 auto", width: "10%" }}>
      <Counter1 />
      <Counter2 />
    </div>
  );
}

export default App;
