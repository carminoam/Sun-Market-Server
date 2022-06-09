import { UserModel } from './../../../frontend/src/app/models/user.model';
import { Document, model, Schema } from "mongoose";

export interface ICartModel extends Document {
    // userId: Schema.Types.ObjectId; // fk
    userId: string;
    date: Date; //date of creation
}

const CartSchema = new Schema<ICartModel>({
    userId: {
        // type: Schema.Types.ObjectId,
        type: String,
        required: [true, "Missing userId"],
    },
    date: {
        type: Date,
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

// CartSchema.virtual("user", {
//     ref: UserModel,
//     localField: "userId",
//     foreignField: "_id",
//     justOne: true,
// });

export const CartModel = model<ICartModel>("CartModel", CartSchema, "carts");


