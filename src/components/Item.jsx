import React from "react";

export default function Item() {
  return (
    <div className="showcase-item">
      <img src="images/chris.jpg" alt="images" />
      <div className="img-highlight">
        <div className="img-deatil">
          <div className="img-name">Rain</div>
          <div className="img-author">
            by <span> Bibek Thapa </span>
          </div>
        </div>
        <div className="img-like">12 Like</div>
      </div>
    </div>
  );
}
