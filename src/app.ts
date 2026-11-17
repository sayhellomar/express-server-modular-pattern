import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { studentRoute } from "./modules/students/student.route";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express PostgreSQL server");
});

app.use("/api/v1/students", studentRoute);

export default app;
