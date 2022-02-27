import express from "express";

const app = express();

app.get("/question/random", (req, res) => {
  res.json({
    question: "hva gjør du?",
    answer: "dummy svar",
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on: http://localhost:${server.address().port}`);
});
