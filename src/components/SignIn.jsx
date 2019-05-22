import React, { useState, useEffect } from "react";
import serverUrl from "../url";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimP, setConfrimP] = useState("");
  const [message, setMessage] = useState(null);
  function handleSubmit() {
    const data = {
      name,
      email,
      password
    };
    const url = `${serverUrl}/auth/signin`;
    console.log(data);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
      });
  }
  function handleName(value) {
    setName(value);
  }
  function handleEmail(value) {
    setEmail(value);
  }
  function handlePassword(value) {
    setPassword(value);
  }
  function handleConfrimP(value) {
    setConfrimP(value);
  }
  return (
    <div>
      {message ? message : null}
      <h1>SignIn</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={e => handleName(e.target.value)}
          value={name}
        />
      </div>
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
      <div>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="text"
          name="confirm"
          value={confrimP}
          onChange={e => handleConfrimP(e.target.value)}
        />
      </div>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default SignIn;
