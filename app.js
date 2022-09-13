import express from "express";
import cors from "cors";
import { reviewsRouter } from './routes/index.js'

const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.use("/", reviewsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;