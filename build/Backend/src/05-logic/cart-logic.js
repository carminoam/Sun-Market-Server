"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cart_model_1 = require("../03-models/cart-model");
var error_model_1 = __importDefault(require("../03-models/error-model"));
var cart_item_model_1 = require("./../03-models/cart-item-model");
// Get cart by user id:
function getCartByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_model_1.CartModel.findOne({ userId: userId }).exec()];
                case 1:
                    cart = _a.sent();
                    // if (!cart) throw new ErrorModel(404, 'Cart not found');
                    return [2 /*return*/, cart];
            }
        });
    });
}
// Create cart:
function createCartOrGet(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var existingCart, date, newCart, createdCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCartByUserId(userId)];
                case 1:
                    existingCart = _a.sent();
                    if (existingCart)
                        return [2 /*return*/, existingCart];
                    date = new Date();
                    newCart = new cart_model_1.CartModel({ userId: userId, date: date });
                    return [4 /*yield*/, newCart.save()];
                case 2:
                    createdCart = _a.sent();
                    return [2 /*return*/, createdCart];
            }
        });
    });
}
// Get cart-items by cart-id:
function getCartItemsByCartId(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var cartItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.find({ cartId: cartId }).populate('product').exec()];
                case 1:
                    cartItems = _a.sent();
                    if (!cartItems)
                        throw new error_model_1.default(404, 'Cart-items not found');
                    return [2 /*return*/, cartItems];
            }
        });
    });
}
// Update cart item:
function updateCartItem(cartItem) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedCartItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.findByIdAndUpdate(cartItem._id, cartItem, { returnOriginal: false }).exec()];
                case 1:
                    updatedCartItem = _a.sent();
                    if (!updatedCartItem)
                        throw new error_model_1.default(404, 'Cart item not found');
                    return [2 /*return*/, updatedCartItem];
            }
        });
    });
}
// Create cart item:
function createCartItem(cartItem) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, addedItem, itemWithProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = cartItem.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    return [4 /*yield*/, cartItem.save()];
                case 1:
                    addedItem = _a.sent();
                    return [4 /*yield*/, cart_item_model_1.CartItemModel.findById(addedItem._id).populate('product').exec()];
                case 2:
                    itemWithProduct = _a.sent();
                    return [2 /*return*/, itemWithProduct];
            }
        });
    });
}
// Delete cart item:
function deleteCartItem(id) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedCartItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.findByIdAndRemove(id).exec()];
                case 1:
                    deletedCartItem = _a.sent();
                    if (!deletedCartItem)
                        throw new error_model_1.default(404, 'Cart item not found');
                    return [2 /*return*/];
            }
        });
    });
}
// Delete ALL cart items:
function deleteAllCartItems(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedCartItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.deleteMany({ cartId: cartId }).exec()];
                case 1:
                    deletedCartItems = _a.sent();
                    if (!deletedCartItems)
                        throw new error_model_1.default(404, 'Cart items not found');
                    return [2 /*return*/];
            }
        });
    });
}
// Create new order:
function createOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            errors = order.validateSync();
            if (errors)
                throw new error_model_1.default(400, errors.message);
            return [2 /*return*/, order.save()];
        });
    });
}
exports.default = {
    // getCartByUserId,
    createCartItem: createCartItem,
    createCartOrGet: createCartOrGet,
    updateCartItem: updateCartItem,
    deleteCartItem: deleteCartItem,
    getCartItemsByCartId: getCartItemsByCartId,
    deleteAllCartItems: deleteAllCartItems,
    createOrder: createOrder
};
