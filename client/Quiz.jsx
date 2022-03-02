import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { randomQuestion, isCorrectAnswer } from "./questions";

export const QuestionContext = React.createContext({ randomQuestion });

function FrontPage({ correctAnswer, questionsAnswered }) {
  return (
    <div>
      <h1>FREDAGSQUIZEN-PROGGERN</h1>
      <div data-testid={"status"}>
        You have answered {correctAnswer} of {questionsAnswered} correctly{" "}
      </div>
      <Link to={"/question"}>
        <button>Take a new quiz</button>
      </Link>
    </div>
  );
}

function ShowQuestion({ setCorrectAnswer, setQuestionsAnswered }) {
  function handleAnswer(answer) {
    setQuestionsAnswered((q) => q + 1);
    if (isCorrectAnswer(question, answer)) {
      setCorrectAnswer((q) => q + 1);
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  }
  const navigate = useNavigate();
  const { randomQuestion } = useContext(QuestionContext);
  const [question] = useState(randomQuestion());
  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <div key={a} data-testid={a}>
            <button onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </div>
        ))}
    </div>
  );
}

function ShowAnswer() {
  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>CORRECT!!!</h1>}></Route>
        <Route path={"wrong"} element={<h1>WRONG;(</h1>}></Route>
      </Routes>
      <div>
        <Link to={"/"}> Show score </Link>{" "}
      </div>
      <div>
        <Link to={"/question"}> New question </Link>{" "}
      </div>
    </div>
  );
}

export function Quiz() {
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            questionsAnswered={questionsAnswered}
            correctAnswer={correctAnswer}
          />
        }
      />
      <Route
        path={"/question"}
        element={
          <ShowQuestion
            setQuestionsAnswered={setQuestionsAnswered}
            setCorrectAnswer={setCorrectAnswer}
          />
        }
      />
      <Route
        path={"/answer/*"} //* is wildcard so it triggers for correct and wrong
        element={<ShowAnswer />}
      />
    </Routes>
  );
}
