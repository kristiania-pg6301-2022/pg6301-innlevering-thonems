import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("../client/dist"));

app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  return res.json({ id, question, answers, category });
});

app.post("/api/question", (req, res) => {
  const { answer, id } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    res.sendStatus(404);
  }
  //check score and send back true or false
  if (isCorrectAnswer(answer, id)) {
    res.json({ correct: "true" });
  } else {
    res.json({ correct: "false" });
  }
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on: http://localhost:${server.address().port}`);
});

export default app;
