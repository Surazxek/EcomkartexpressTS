import express, { Application, type Request, type Response, type NextFunction } from "express";
import path from "path";
import CustomError, { errorHandler } from "./middleware/Error-handler";
import "./config/mongoDB"
import mainRouter from "./router/mainRouter";

const app: Application = express();

// Data parsing middleware
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb"}))

//public dir folder
app.use('/assets', express.static(path.join(process.cwd(), "public/uploads/")));

//router
app.use(mainRouter)

// route 404 Not-Found


// 404 Route Handler (Express 5)
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Cannot ${req.method} on ${req.originalUrl}`;
  next(new CustomError(message, 404));
}); 

app.use(errorHandler)


export default app;