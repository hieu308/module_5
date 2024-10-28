import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import Todo from "./components/Todo";

function App() {
    return (
        <div><Todo/>
            <ToastContainer/>
        </div>)

}

export default App;
