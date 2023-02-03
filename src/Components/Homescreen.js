import React from "react";

export default function Homescreen(props) {
  return (
    <div className="homescreen">
      <h1 className="title">Quizzical</h1>
      <p className="description">Welcome to the Quiz app!</p>
      <button className="start-btn" onClick={props.start}>
        Start quiz
      </button>
    </div>
  );
}
