"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(user) {
        this.email = user.email;
        this.password = user.password;
    }
    return CredentialsModel;
}());
exports.default = CredentialsModel;
