"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userAddress = void 0;
var role_model_1 = require("./role-model");
var userAddress = /** @class */ (function () {
    function userAddress() {
    }
    return userAddress;
}());
exports.userAddress = userAddress;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.role = role_model_1.RoleModel.USER;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
