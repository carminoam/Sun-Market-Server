"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
var mongoose_1 = require("mongoose");
var product_model_1 = require("./product-model");
var CartItemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        // type: String,
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
    ref: product_model_1.ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true,
});
exports.CartItemModel = (0, mongoose_1.model)("CartItemModel", CartItemSchema, "cartItems");
