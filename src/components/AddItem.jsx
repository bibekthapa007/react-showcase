import React from "react";
import { useInput } from "./useInputHook";

function AddItem({ handleClose }) {
  // const [link, setLink] = useState("");
  // const [title, setTitle] = useState("");
  // const [medium, setMedium] = useState("");
  // const [artist, setArtist] = useState("");
  // const [contributor, setContributor] = useState("");
  const { value: link, bind: bindLink, reset: resetLink } = useInput("");
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: artist, bind: bindArtist, reset: resetArtist } = useInput("");
  const { value: medium, bind: bindMedium, reset: resetMedium } = useInput("");
  const {
    value: contributor,
    bind: bindContributor,
    reset: resetContributor
  } = useInput("");

  const handleSubmit = event => {
    //TODO: add item to mongodb
    const data = {
      link: link,
      title: title,
      artist: artist,
      medium: medium,
      contributor: contributor
    };

    fetch("http://localhost:5000/add-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: data })
    })
      .then(e => console.log("hello"))
      .catch(err => console.log(err));

    console.log(data);
    resetArtist();
    resetContributor();
    resetMedium();
    resetLink();
    resetTitle();
    handleClose();
    event.preventDefault();
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <h2>Add Art Piece</h2>
      <input type="text" placeholder="Art Link" {...bindLink} />
      <input type="text" placeholder="Art Title" {...bindTitle} />
      <input type="text" placeholder="Artist" {...bindArtist} />
      <input type="text" placeholder="Medium" {...bindMedium} />
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
