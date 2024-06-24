import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFoundHandler } from "./app/middleware/notFoundHandler";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("ph uni root path");
});

//  middlewares
app.use(globalErrorHandler);

app.use("/*", notFoundHandler);

export default app;
