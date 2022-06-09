import { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import ErrorModel from "../03-models/error-model";


async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"

    const isAdmin = await cyber.verifyRole(authorizationHeader);
    console.log(isAdmin)

    if(!isAdmin) {
        next(new ErrorModel(401, "You are not Admin"));
        return;
    }

    next();
}

export default verifyAdmin


