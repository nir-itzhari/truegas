import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal"
dal.connect()
import fileUpload from 'express-fileupload';
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import authController from "./06-controllers/auth-controller";
import assignmentController from "./06-controllers/assignment-controller";
import clientController from "./06-controllers/client-controller";




const expressServer = express();
expressServer.use(express.json());

if (config.isDevelopment) expressServer.use(cors());
expressServer.use(fileUpload());

expressServer.use("/api/auth", authController);
expressServer.use("/api", assignmentController);
expressServer.use("/api", clientController);
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

expressServer.use(errorsHandler);
expressServer.listen(process.env.PORT, () => console.log("Listening... PORT: " + process.env.PORT));
