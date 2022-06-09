import { UserModel } from './../03-models/user-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/auth-logic";
import CredentialsModel from '../03-models/credentials-model';

const router = express.Router();

router.post("/auth/register1", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.body;
        const newUser = await logic.register1(user);
        response.json(newUser);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/register2", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await logic.register2(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await logic.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// router.get("/auth/check-id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const idNumber = request.body.idNumber;
//         const isTaken = await logic.isIdNumberTaken(idNumber);
//         response.json(isTaken);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

export default router;
