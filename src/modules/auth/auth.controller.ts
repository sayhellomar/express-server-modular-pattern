import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

async function loginStudent(req: Request, res: Response) {
    try {
        const result = await authService.loginStudentToDB(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            domain: "localhost",
        });
        sendResponse(res, 200, true, "You are authenticated", result);
    } catch (error: any) {
        sendResponse(res, 401, false, error.message);
    }
}

async function refreshAccessToken(req: Request, res: Response) {
    try {
        const result = await authService.refreshGenerateAccessToken(
            req.cookies.refreshToken,
        );
        sendResponse(
            res,
            200,
            true,
            "Access token generated successfully",
            result,
        );
    } catch (error: any) {
        sendResponse(res, 500, false, error.message, error);
    }
}

export const authController = {
    loginStudent,
    refreshAccessToken,
};
