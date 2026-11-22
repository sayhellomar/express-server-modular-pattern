import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { studentRoute } from "./modules/students/student.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
};

app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Express PostgreSQL server");
});

app.use("/api/v1/students", studentRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;
