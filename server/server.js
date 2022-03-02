import express from "express";
import * as path from "path";

const app = express();

app.get("/api/question", (req, res) => {
  res.json({
    id: "5",
    category: "Mat",
    question: "hva gjør du?",
    answer: "dummy svar",
  });
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
