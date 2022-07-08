"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../01-utils/config"));
function errorsHandler(err, request, response, next) {
    var status = err.status || 500;
    console.log(err);
    var msg;
    if (config_1.default.isDevelopment) {
        msg = err.message;
    }
    else if (status !== 500) {
        msg = err.message;
    }
    else {
        msg = "Some error, please try again...";
    }
    response.status(status).send(msg);
}
exports.default = errorsHandler;
