import type { NextFunction, Request, Response } from "express";
import fs from "fs";

export default function logger(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const logs = `LOGGED: Method: ${req.method} | url: ${
        req.url
    } | Time: ${Date.now()}\n`;

    fs.appendFile("logger.txt", logs, (error) => {
        if (error) throw new Error("Something went wrong");
    });
    next();
}
