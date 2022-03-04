import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage, ShowQuestion } from "./Quiz";

function Quiz() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/question"} element={<ShowQuestion />} />
        <Route path={"/wrong"} element={<wrong />} />
        <Route path={"/right"} element={<right />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Quiz />, document.getElementById("app"));
