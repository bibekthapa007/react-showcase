import React, { useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import AddItem from "./AddItem";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  function showModal() {
    setShow(true);
  }
  function hideModal() {
    setShow(false);
  }
  return (
    <div className="wrapper">
      <div className="add-item">
        <input type="text" placeholder="Search Images" />
        <Modal show={show} handleClose={() => hideModal()}>
          <AddItem />
        </Modal>
        <button onClick={() => showModal()} className="add-item-button">
          Add
        </button>
      </div>
      <div className="showcase">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
