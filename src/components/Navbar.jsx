import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <div className="navWrapper">
        <div className="header">
          <Link to="/">Showcase</Link>
        </div>
        <div className="navIcons">
          <div className="navIcon">
            <a
              rel="noopener noreferrer"
              href="https://github.com/Bitha007"
              target="_blank"
            >
              Github
            </a>
          </div>
          <div className="navIcon">
            <a
              rel="noopener noreferrer"
              href="https://twitter.com/bibe_k_"
              target="_blank"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
