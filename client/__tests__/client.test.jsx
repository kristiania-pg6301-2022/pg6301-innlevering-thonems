import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Quiz, QuestionContext, ShowQuestion } from "../Quiz";
import { Simulate } from "react-dom/test-utils";

const questionNotRandom = {
  question: "Are you at least trying?",
  answers: {
    answer_a: "Yes",
    answer_b: "I am!",
    answer_c: "I'm trying my best",
    answer_d: "no",
  },
  correctAnswer: {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "true",
    answer_d_correct: "false",
  }
};

describe("", () => {
  it("Test if test runs on client", () => {
    expect(3).toBe(3);
  });

  it("Should render question", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider
          value={{ randomQuestion: () => questionNotRandom }}
        >
          <Quiz />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("Shows the answer you choose", () => {
    const questionAnswered = jest.fn();
    const correctAnswer = jest.fn();

    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider
          value={{ randomQuestion: () => questionNotRandom }}
        >
          <ShowQuestion
            setQuestionsAnswered={questionAnswered}
            setCorrectAnswer={correctAnswer}
          />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );
    Simulate.click(element.querySelector("[data-testid=answer_c]"));
    expect(questionAnswered).toBeCalled();
    expect(correctAnswer).toBeCalled();
  });
});
