"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var salt = "Hakuna Matata"; // Hash salt.
// Hash password:
function hash(plainText) {
    if (!plainText)
        return null;
    var hashedText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText;
}
var secretKey = "SkyAreBlue";
function getNewToken(user) {
    // The object we're setting inside the token: 
    var payload = { user: user };
    // Generate token: 
    var token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "2h" });
    // Return the token:
    return token;
}
function verifyToken(authorizationHeader) {
    return new Promise(function (resolve, reject) {
        // If there is no authorization header: 
        if (!authorizationHeader) {
            resolve(false);
            return;
        }
        // Extract the token ("Bearer given-token"): 
        var token = authorizationHeader.split(" ")[1];
        // If there is no token: 
        if (!token) {
            resolve(false);
            return;
        }
        // Here we have a token: 
        jsonwebtoken_1.default.verify(token, secretKey, function (err) {
            // If token expired, if token not legal:
            if (err) {
                resolve(false);
                return;
            }
            // Here the token is legal: 
            resolve(true);
        });
    });
}
function verifyRole(authorizationHeader) {
    return new Promise(function (resolve, reject) {
        // If there is no authorization header: 
        if (!authorizationHeader) {
            resolve(false);
            return;
        }
        // Extract the token ("Bearer given-token"): 
        var token = authorizationHeader.split(" ")[1];
        // If there is no token: 
        if (!token) {
            resolve(false);
            return;
        }
        // if the user is not admin: 
        var encodedObject = (0, jwt_decode_1.default)(token);
        if (encodedObject.user.role !== "Admin") {
            resolve(false);
            return;
        }
        // Here we have a token: 
        jsonwebtoken_1.default.verify(token, secretKey, function (err) {
            // If token expired, if token not legal:
            if (err) {
                resolve(false);
                return;
            }
            // Here the token is legal: 
            resolve(true);
        });
    });
}
function extractUserId(authorizationHeader) {
    // If there is no authorization header: 
    if (!authorizationHeader) {
        console.log("no header");
        return null;
    }
    // Extract the token ("Bearer given-token"): 
    var token = authorizationHeader.split(" ")[1];
    // If there is no token: 
    if (!token) {
        console.log("no token");
        return null;
    }
    // Here we have a token: 
    var encodedObject = (0, jwt_decode_1.default)(token);
    return encodedObject.user._id;
}
exports.default = {
    hash: hash,
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    verifyRole: verifyRole,
    extractUserId: extractUserId
};
