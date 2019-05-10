import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound wrapper">
      <h1>Not Found</h1>
      <p> This page is not found. Please visit the home page.</p>
      <button>
        <Link to="/">Go to Home Page.</Link>
      </button>
    </div>
  );
}

export default NotFound;
