import { CartModel } from './../../../frontend/src/app/models/cart.model';
import { Document, model, Schema } from "mongoose";

export interface IOrderModel extends Document {
    cartId: Schema.Types.ObjectId; // fk
    // public userId: Schema.Types.ObjectId;
    orderDate: Date;
    deliveryDate: Date;
    payment4Digits: string;
    city: string;
    street: string;
    totalPrice: number;
}

const OrderSchema = new Schema<IOrderModel>({
    cartId: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing cartId"],
    },
    orderDate: {
        type: Date,
        required: [true, "Missing orderDate"],
    },
    deliveryDate: {
        type: Date,
        required: [true, "Missing deliveryDate"],
    },
    payment4Digits: {
        type: String,
        required: [true, "Missing payment4Digits"],
        min: [0, "Payment4Digits can't be negative"],
    },
    city: {
        type: String,
        required: [true, "Missing city"],
    },
    street: {
        type: String,
        required: [true, "Missing street"],
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

OrderSchema.virtual("cart", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true,
});

export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "orders");



