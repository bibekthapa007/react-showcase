import React, { useEffect, useState } from "react";
import serverUrl from "../url";
const queryString = require("query-string");

function VerifyToken({ location, history }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function verifyToken() {
      const parsed = queryString.parse(location.search);
      const token = parsed.token;
      console.log(token, "token id");
      const url = `${serverUrl}/auth/verify?token=${token}`;
      console.log(url);
      await fetch(url)
        .then(result => result.json())
        .then(data => setData(data))
        .catch(e => console.log(e));
    }
    verifyToken();
  }, [location]);
  return (
    <div>
      {data ? (
        <div>
          <div>{data.message}</div>
          {data.isVerified ? (
            <button onClick={() => history.push("/login")}> Login</button>
          ) : (
            <div>
              <button onClick={() => history.push("/resendToken")}>
                Resend Token
              </button>
              <button onClick={() => history.push("/signin")}>Signin</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default VerifyToken;
