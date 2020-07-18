import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "./firebase/index";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App />, document.querySelector("#root"));
