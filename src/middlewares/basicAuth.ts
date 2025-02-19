import { Request, Response, NextFunction } from "express";

const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME;
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    console.log(BASIC_AUTH_PASSWORD);

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.status(401).json({ message: "Unauthorized: Missing authentication header" });
        return;
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD) {
        res.status(401).json({ message: "Unauthorized: Invalid credentials" });
        return;
    }

    next();
};
