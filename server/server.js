import express from "express";

const app = express();

app.get("/api/question", (req, res) => {
  res.json({
    id:"5",
    category:"Mat",
    question: "hva gjør du?",
    answer: "dummy svar",
  });
});

//todo
//app.post("/api/question")

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on: http://localhost:${server.address().port}`);
});
