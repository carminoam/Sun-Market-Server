import { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import ErrorModel from "../03-models/error-model";


async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"

    const isValid = await cyber.verifyToken(authorizationHeader);

    if(!isValid) {
        next(new ErrorModel(401, "You are not logged in"));
        return;
    }

    next();
}

export default verifyLoggedIn