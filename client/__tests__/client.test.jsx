import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Quiz, QuestionContext } from "../Quiz";

const questionNotRandom = {
  question: "Are you at least trying?",
  answers:{
    answer_a: "Yes",
    answer_b: "I am!",
    answer_c: "I'm trying my best",
    answer_d: "no"
  }
}

describe("", () => {
  it("Test if test runs on client", () => {
    expect(3).toBe(3);
  });

  it("Should render question", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider value ={{randomQuestion: () => questionNotRandom}}>
          <Quiz  />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
