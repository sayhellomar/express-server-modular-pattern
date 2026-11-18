import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { profileService } from "./profile.service";

async function createProfile(req: Request, res: Response) {
    try {
        const result = await profileService.createProfileToDB(req.body);

        sendResponse(res, 201, true, "Created successfully", result.rows[0]);
    } catch (error: any) {
        if (error.code === "23505") {
            return sendResponse(res, 409, false, "Student profile is exists");
        }
        sendResponse(res, 400, false, error.message);
    }
}

export const profileContoller = {
    createProfile,
};
