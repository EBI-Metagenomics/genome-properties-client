import React from "react";
import "./style.css";

const Loading = ({ fontSize = "1rem" }) => (
  <div className="lds-ellipsis" style={{ fontSize }}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loading;
