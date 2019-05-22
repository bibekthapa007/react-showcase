import React, { useState } from "react";
import serverUrl from "../url";
import "./css/Form.css";

function SignIn({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimP, setConfrimP] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  function handleSubmit() {
    setMessage("");
    setLoading(true);
    const data = {
      name,
      email,
      password,
      profileURL
    };
    var status;
    const url = `${serverUrl}/auth/signin`;
    console.log(data);
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
      .then(data => {
        if (status === 201) {
          setMessage(data.message);
          setLoading(false);
        } else if (status === 200) {
          console.log(data);
          setName("");
          setEmail("");
          setPassword("");
          setConfrimP("");
          setProfileURL("");
          setMessage(data.message);
          setLoading(false);
        }
      })
      .catch(e => console.log(e));
  }
  function handleName(value) {
    setName(value);
  }
  function handleEmail(value) {
    setEmail(value);
  }
  function handleProfileUrl(value) {
    setProfileURL(value);
  }
  function handlePassword(value) {
    setPassword(value);
  }
  function handleConfrimP(value) {
    setConfrimP(value);
  }
  return (
    <div className="form">
      <div className="form-wrapper">
        <div className="error">{message ? message : null}</div>
        <h1>SignIn</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="round-input"
            onChange={e => handleName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="round-input"
            onChange={e => handleEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="profileUrl">Profile Picture Link</label>
          <input
            type="text"
            name="profileUrl"
            className="round-input"
            onChange={e => handleProfileUrl(e.target.value)}
            value={profileURL}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="round-input"
            value={password}
            onChange={e => handlePassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            className="round-input"
            value={confrimP}
            onChange={e => handleConfrimP(e.target.value)}
            required
          />
        </div>
        <button onClick={() => handleSubmit()}>
          {loading ? "Loading" : "Submit"}
        </button>
        <button onClick={() => history.push("/login")}>Login</button>
      </div>
    </div>
  );
}

export default SignIn;
