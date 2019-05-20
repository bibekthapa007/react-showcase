import React from "react";
import { useInput } from "./useInputHook";
import { useState } from "react";
import { isFromValid } from "./util";

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

  const [error, setError] = useState({});

  const handleSubmit = event => {
    //TODO: add item to mongodb
    // const thisEvent = event;
    event.preventDefault();
    const data = {
      link: link,
      title: title,
      artist: artist,
      medium: medium,
      contributor: contributor
    };
    const isError = isFromValid(data);
    console.log(isError);
    if (isError === true) {
      fetch("http://localhost:5000/add-image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data })
      })
        .then(e => {
          console.log(data);
          resetArtist();
          resetContributor();
          resetMedium();
          resetLink();
          resetTitle();
          handleClose();
          event.preventDefault();
          addImageCb();
        })
        .catch(err => console.log(err));
    } else {
      setError(isError);
    }
  };
  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
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
