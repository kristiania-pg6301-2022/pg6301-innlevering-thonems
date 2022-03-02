import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api/question", (req, res) => {
  res.json({
    id: "5",
    category: "Mat",
    question: "hva gjør du?",
    answer: "dummy svar",
  });
});

app.get("/quiz/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };

  res.json(score);
});

app.get("/quiz/answer", (req, res) => {
  const { id, answer } = req.body;
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  score.answered += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "incorrect" });
  }
});

app.get("/quiz/random", (req, res) => {
  const { id, question } = randomQuestion();
  res.json({ id, question, answers });
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

//todo
app.post("/api/question", (req, res) => {
  //tar inn id og answer -> false ? true
  const { id, answer } = res.body;
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on: http://localhost:${server.address().port}`);
});
