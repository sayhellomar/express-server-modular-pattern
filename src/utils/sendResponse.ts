import type { Response } from "express";

export default function sendResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object,
) {
    const response = {
        success,
        message,
        data,
    };
    res.status(statusCode).json(response);
}
