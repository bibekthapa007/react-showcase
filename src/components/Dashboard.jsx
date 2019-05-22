import React, { useState, useEffect } from "react";
import Item from "./Item";
import Modal from "./Modal";
import AddItem from "./AddItem";
import { withRouter } from "react-router-dom";
import Pagination from "./Pagination";
import serverUrl from "../url";

function Dashboard({ history }) {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState("");

  function showModal() {
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
  }
  function hideModal() {
    setShow(false);
    document.documentElement.style.overflow = "auto";
    document.body.scroll = "yes";
  }

  function addImageCb() {
    console.log(history);
    history.push("/");
  }

  useEffect(() => {
    async function fetchImages() {
      console.log("I am runining");
      await fetch(`${serverUrl}/images/?id=1&perPage=10`)
        .then(result => result.json())
        .then(data => setImages(data.images));
    }
    fetchImages();
  }, []);
  console.log(images);

  return (
    <div className="wrapper">
      <div className="add-item">
        <input className="flat-input" type="text" placeholder="Search Images" />
        <Modal show={show} handleClose={() => hideModal()}>
          <AddItem addImageCb={addImageCb} />
        </Modal>
        <button onClick={() => showModal()} className="add-item-button">
          Add
        </button>
      </div>
      <div className="showcase">
        {images
          ? images.map((image, index) => (
              <Item
                key={index}
                onClick={() => {
                  history.push(`/image/${image._id}`);
                }}
                image={image}
              />
            ))
          : null}
      </div>
      <Pagination />
    </div>
  );
}

export default withRouter(Dashboard);
