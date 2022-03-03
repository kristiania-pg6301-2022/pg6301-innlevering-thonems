import React, { useState } from "react";
import { fetchJSON, postJSON } from "./http";
import { useLoader } from "./useLoader";
import { Link } from "react-router-dom";

export function FrontPage({ correctAnswer, questionsAnswered }) {
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

export function ShowQuestion({ question, onReload }) {
  async function handleAnswer(answer) {
    const { id } = question;
    postJSON("/quiz/answer", { id, answer });
    onReload();
  }
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
/*
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
 */

function QuestionComponent({ reload }) {
  const [question, setQuestion] = useState();

  async function handleLoadQuestion() {
    const res = await fetch("/quiz/random");
    setQuestion(await res.json());
  }

  function handleReload() {
    setQuestion(undefined);
    reload();
  }

  if (!question) {
    return (
      <div>
        <button onClick={handleLoadQuestion} Load a new question></button>
      </div>
    );
  }
  return <ShowQuestion question={question} onReload={handleReload} />;
}

export function Quiz() {
  const {
    data: score,
    loading,
    reload,
  } = useLoader(async () => fetchJSON("/quiz/score"));
  return (
    <>
      <h1>Welcome to the quiz show</h1>
      {loading && <div>Loading...</div>}
      {score && (
        <div>
          You have answered {score.correct} out of {score.answered} correct
        </div>
      )}
      <QuestionComponent reload={reload} />
    </>
  );
}
