import React, { useState } from "react";

export default function Item({ image, onClick }) {
  // console.log(image);
  const { link, title, artist } = image;
  const [like, setLike] = useState(12);
  return (
    <div className="showcase-item" onClick={onClick}>
      <img src={link} alt="images" />
      <div className="img-highlight ">
        <div className="img-deatil">
          <div className="img-name">{title}</div>
          <div className="img-author">
            by <span> {artist} </span>
          </div>
        </div>
        <div className="img-like" onClick={() => setLike(like + 1)}>
          {like}
          <span aria-label="like" role="img">
            👍
          </span>
        </div>
      </div>
    </div>
  );
}
