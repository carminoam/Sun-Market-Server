
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import cors from "cors";
import expressFileUploaded from 'express-fileupload';
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connect();
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import productsController from "./06-controllers/products-controller";
import authController from "./06-controllers/auth-controller";
import cartController from "./06-controllers/cart-controller";

const server = express();
server.use(cors({  origin: "*" }));

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(expressFileUploaded());
server.use("/api", productsController);
server.use("/api", authController);
server.use("/api", cartController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

if (process.env.NODE_ENV === "production") {
    // server.use(express.static("client/build"));
    // server.get("*", (request: Request, response: Response) => {
    //     response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // }
    // );
}

// step 1
server.listen(process.env.PORT, () => console.log("Listening..."));
