import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginStudent);
router.post("/refresh-token", authController.refreshAccessToken);

export const authRoute = router;
