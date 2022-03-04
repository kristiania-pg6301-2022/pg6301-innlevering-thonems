import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { randomQuestion, isCorrectAnswer } from "./questions";

//export const QuestionContext = React.createContext({ randomQuestion });

export function FrontPage() {
  return (
    <div>
      <h1>FREDAGSQUIZEN-PROGGERN</h1>
      <div></div>
      <Link to={"/question"}>
        <button>Take a new quiz</button>
      </Link>
    </div>
  );
}

export function ShowQuestion() {
  const navigate = useNavigate();

  const { loading, error, data, load } = loader(
    async () => await fetchJSON("/api/question")
  );
  const question = data;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <h2>error.toString()</h2>
      </div>
    );
  }

  async function handleAnswer(answer) {
    /*const res = await fetch("/api/question", {
      method: "post",
      body: JSON.stringify({id, answer}),
      headers: { "content-type": "application/json" },
    });
*/

    const { id } = question;
    await postJSON("/api/question", { id, answer });
    await load();
  }

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <div key={a}>
            <button onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </div>
        ))}
    </div>
  );
}
async function fetchJSON(url) {
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  }
  if (!res.ok) {
    throw new Error(`Failed to load ${res.sendStatus()}: ${res.statusText}`);
  }
}

async function postJSON(url, json) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    throw new Error(res.statusText + res.status);
  }

  //not working, can't figure out how to extract the correct boolean
  if (isCorrectAnswer(res)) {
    navigate("/right");
  } else {
    navigate("/wrong");
  }
}

function loader(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    setLoading(true);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  return { loading, error, data, load };
}

export function wrong() {
  return (
    <Route>
      <div>
        <h1>Sorry, you answered wrong</h1>
        <Link path={"/question"}>
          <button>Neste spørsmål</button>
        </Link>
      </div>
    </Route>
  );
}

export function right() {
  return (
    <div>
      <h1>Right answer!</h1>
      <Link path={"/question"}>
        <button>Neste spørsmål</button>
      </Link>
    </div>
  );
}
