import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

async function loginUser(req: Request, res: Response) {
    try {
        const result = await authService.loginUserToDB(req.body);
        sendResponse(res, 200, true, "You are authenticated", result);
    } catch (error: any) {
        sendResponse(res, 401, false, error.message);
    }
}

export const authController = {
    loginUser,
};
