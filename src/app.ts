import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes";

const app: Application = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(morgan("dev"))

app.use(express.json())

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/vi",router)

// 404 handler
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
