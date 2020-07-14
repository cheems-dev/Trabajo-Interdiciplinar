import React from "react";
import logo from "./img/file.png";

const Files = (props) => {
  const { title } = props;
  return (
    <>
      {" "}
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{" "}
      {title}
      <br />
    </>
  );
};

export default Files;
