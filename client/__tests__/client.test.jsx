import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Quiz, QuestionContext, ShowQuestion, FrontPage } from "../Quiz.jsx";
import { Simulate } from "react-dom/test-utils";

const questionNotRandom = {
  question: "Are you at least trying?",
  answers: {
    answer_a: "Yes",
    answer_b: "I am!",
    answer_c: "I'm trying my best",
    answer_d: "no",
  },
  correct_answers: {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "true",
    answer_d_correct: "false",
  },
};

describe("Tests for the client", () => {
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
    Simulate.click(element.querySelector("[data-testid=answer_c] button"));

    expect(questionAnswered).toBeCalled();
    expect(correctAnswer).toBeCalled();
  });

  it("show your score", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage questionsAnswered={4} correctAnswer={2} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "You have answered 2 of 4 correctly "
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
