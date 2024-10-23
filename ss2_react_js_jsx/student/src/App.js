import "./App.css";
import React, { useState, useEffect } from "react";
import { getStudents } from "./components/student";
function App() {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    const students = getStudents();
    setStudentList(students);
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>company</th>
          <th>contact</th>
          <th>country</th>
        </tr>
        <tbody>
          {studentList.map((student) => (
            <tr>
              <td>{student.company}</td>
              <td>{student.contact}</td>
              <td>{student.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container d-flex align-items-center text-center">
        <div className="form-signin">
          <form>
            <img
              className="mb-4"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png"
              alt=""
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control email"
                id="floatingInput"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control password"
                id="floatingPassword"
                placeholder="Password"
              />
            </div>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
