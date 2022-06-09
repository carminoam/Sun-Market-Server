import { Document, model, Schema } from "mongoose";
import { ProductModel } from "./product-model";

export interface ICartItemModel extends Document {
    productId: string;  // fk
    cartId: string; // fk
    quantity: number;
    totalPrice: number;
}

const CartItemSchema = new Schema<ICartItemModel>({
    productId: {
        // type: Schema.Types.ObjectId,
        type: String,
        required: [true, "Missing productId"],
    },
    cartId: {
        type: String,
        required: [true, "Missing cartId"],
    },
    quantity: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [1, "Quantity can't be less than 1"],
        max: [100, "Quantity can't be more than 100"],  
    },
    totalPrice: {
        type: Number,
        required: [true, "Missing totalPrice"],
        min: [0, "TotalPrice can't be negative"],
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});


CartItemSchema.virtual("product", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true,
});

export const CartItemModel = model<ICartItemModel>("CartItemModel", CartItemSchema, "cartItems");
