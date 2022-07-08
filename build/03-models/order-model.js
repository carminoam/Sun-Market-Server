"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var cart_model_1 = require("./../../../frontend/src/app/models/cart.model");
var mongoose_1 = require("mongoose");
var OrderSchema = new mongoose_1.Schema({
    cartId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    ref: cart_model_1.CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true,
});
exports.OrderModel = (0, mongoose_1.model)("OrderModel", OrderSchema, "orders");
