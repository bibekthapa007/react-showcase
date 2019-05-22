import React, { useState, useContext } from "react";
import serverUrl from "../url";
import "./css/Form.css";
import { UserContext } from "../UserProvider";

function Login({ history }) {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  function handleSubmit() {
    setMessage(null);
    var status = null;
    const data = {
      email,
      password
    };
    const url = `${serverUrl}/auth/login`;
    console.log(data, url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(d => {
        if (status === 200) {
          console.log(d);
          login(d.user, d.token);
          history.push("/");
        } else {
          setMessage(d.message);
        }
      })
      .catch(e => console.log(e));
  }

  function handleEmail(value) {
    setEmail(value);
  }
  function handlePassword(value) {
    setPassword(value);
  }
  return (
    <div className="form">
      <div className="form-wrapper">
        <h1>Login</h1>
        <div>{message}</div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="round-input"
            name="email"
            onChange={e => handleEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            className="round-input"
            onChange={e => handlePassword(e.target.value)}
          />
        </div>
        <button onClick={() => handleSubmit()}>Submit</button>
        <button onClick={() => history.push("/signin")}>SignIn</button>
      </div>
    </div>
  );
}

export default Login;
