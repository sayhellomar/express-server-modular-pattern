import { Router } from "express";
import { profileContoller } from "./profile.controller";

const router = Router();

router.post("/", profileContoller.createProfile);

export const profileRoute = router;
