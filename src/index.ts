import express from "express";
import cors from "cors";
import { PORT, ALLOWED_ORIGIN } from "./config/env";
import test from "./routes/testRoute";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Express!");
});

app.use("/api/test", test);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
