import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { studentRoute } from "./modules/students/student.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express PostgreSQL server");
});

app.use("/api/v1/students", studentRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

export default app;
