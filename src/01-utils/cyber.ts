import jwtDecode from 'jwt-decode';
import { IUserModel } from './../03-models/user-model';
import crypto from "crypto";
import jwt from "jsonwebtoken";

const salt = "Hakuna Matata"; // Hash salt.

// Hash password:
function hash(plainText: string): string {

    if(!plainText) return null;

    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex"); 

    return hashedText;
}

const secretKey = "SkyAreBlue";

function getNewToken(user: IUserModel): string {

    // The object we're setting inside the token: 
    const payload = { user };

    // Generate token: 
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    // Return the token:
    return token;
}

function verifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

        // If there is no authorization header: 
        if(!authorizationHeader) {
            resolve(false);
            return;
        }

        // Extract the token ("Bearer given-token"): 
        const token = authorizationHeader.split(" ")[1];

        // If there is no token: 
        if(!token) {
            resolve(false);
            return;
        }

        // Here we have a token: 
        jwt.verify(token, secretKey, (err) => {

            // If token expired, if token not legal:
            if(err) {
                resolve(false);
                return;
            }

            // Here the token is legal: 
            resolve(true);
        });

    });

}

function verifyRole(authorizationHeader: string) {

    return new Promise((resolve, reject) => {

        // If there is no authorization header: 
        if(!authorizationHeader) {
            resolve(false);
            return;
        }

        // Extract the token ("Bearer given-token"): 
        const token = authorizationHeader.split(" ")[1];

        // If there is no token: 
        if(!token) {
            resolve(false);
            return;
        }

        // if the user is not admin: 
        const encodedObject: any = jwtDecode(token);
        if(encodedObject.user.role !== "Admin") {
            resolve(false);
            return;
        }

        // Here we have a token: 
        jwt.verify(token, secretKey, (err) => {

            // If token expired, if token not legal:
            if(err) {
                resolve(false);
                return;
            }

            // Here the token is legal: 
            resolve(true);
        });

    });

}

function extractUserId(authorizationHeader: string): string {

    // If there is no authorization header: 
    if(!authorizationHeader) {
        console.log("no header");
        return null;
    }

    // Extract the token ("Bearer given-token"): 
    const token = authorizationHeader.split(" ")[1];

    // If there is no token: 
    if(!token) {
        console.log("no token");
        return null;
    }

    // Here we have a token: 
    const encodedObject: any = jwtDecode(token);
    return encodedObject.user._id;
}

export default {
    hash,
    getNewToken,
    verifyToken,
    verifyRole,
    extractUserId
}

