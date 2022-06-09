import { Document, model, Schema } from "mongoose";
import RoleModel from "./role-model";


// export interface UserAddress {
//     city: string;
//     street: string;
//     number: number;
// }

export interface IUserModel extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    email: string;
    password: string;
    role: RoleModel;
    city: string;
    street: string;
}

const UserSchema: Schema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");


