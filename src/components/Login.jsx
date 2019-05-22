import React, { useState } from "react";
import serverUrl from "../url";

function Login() {
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
    <div>
      LoginFrom
      <div>{message}</div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
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
          onChange={e => handlePassword(e.target.value)}
        />
      </div>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default Login;
