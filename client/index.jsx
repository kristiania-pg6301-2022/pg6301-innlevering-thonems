import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Quiz } from "./Quiz";

ReactDOM.render(
  <BrowserRouter><Quiz/></BrowserRouter>,
  document.getElementById("app")
);
