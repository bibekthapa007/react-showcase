import React from "react";
import { useInput } from "./useInputHook";
import { useState, useContext } from "react";
import { isFromValid } from "./util";
import axios from "axios";
import { UserContext } from "../UserProvider";
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function AddItem({ handleClose, addImageCb }) {
  const { value: link, bind: bindLink, reset: resetLink } = useInput("");
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: artist, bind: bindArtist, reset: resetArtist } = useInput("");
  const { value: medium, bind: bindMedium, reset: resetMedium } = useInput("");
  const {
    value: contributor,
    bind: bindContributor,
    reset: resetContributor
  } = useInput("");
  const context = useContext(UserContext);
  console.log(context);

  const [error, setError] = useState({});
  const [message, setMessage] = useState(null);

  const handleSubmit = event => {
    //TODO: add item to mongodb
    // const thisEvent = event;
    event.preventDefault();

    const data = {
      link: link,
      title: title,
      artist: artist,
      medium: medium
    };
    const isError = isFromValid(data);
    console.log(isError);
    if (isError === true) {
      authAxios
        .post("http://localhost:5000/add-image", {
          data: data
        })
        .then(d => {
          console.log(d);
          if (d.status === 200) {
            resetArtist();
            resetContributor();
            resetMedium();
            resetLink();
            resetTitle();
            handleClose();
            addImageCb();
          } else if (d.status === 201) {
            setMessage("Please Login to add Image");
          }
        })
        .catch(err => console.log(err));
    } else {
      setError(isError);
    }
  };
  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      {message}
      <h1>Add Art Piece</h1>
      <div className="error">{error.link}</div>
      <input type="text" placeholder="Art Link" {...bindLink} />
      <div className="error">{error.title}</div>

      <input type="text" placeholder="Art Title" {...bindTitle} />
      <div className="error">{error.artist}</div>

      <input type="text" placeholder="Artist" {...bindArtist} />
      <div className="error">{error.medium}</div>

      <input type="text" placeholder="Medium" {...bindMedium} />
      <div className="error">{error.contributor}</div>

      <input type="text" placeholder="Contributor" {...bindContributor} />
      <div className="add-button">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </form>
  );
}

export default AddItem;
