"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var CartSchema = new mongoose_1.Schema({
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
exports.CartModel = (0, mongoose_1.model)("CartModel", CartSchema, "carts");
