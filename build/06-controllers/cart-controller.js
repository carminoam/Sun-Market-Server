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
var express_1 = __importDefault(require("express"));
var cart_item_model_1 = require("../03-models/cart-item-model");
var cart_logic_1 = __importDefault(require("../05-logic/cart-logic"));
var cyber_1 = __importDefault(require("../01-utils/cyber"));
var order_model_1 = require("../03-models/order-model");
var router = express_1.default.Router();
// Get cart by user id:
router.get("/cart", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cart, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = cyber_1.default.extractUserId(request.headers.authorization);
                return [4 /*yield*/, cart_logic_1.default.createCartOrGet(userId)];
            case 1:
                cart = _a.sent();
                response.json(cart);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Create cart item:
router.post("/cart/items", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartItem, newCartItem, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartItem = new cart_item_model_1.CartItemModel(request.body);
                return [4 /*yield*/, cart_logic_1.default.createCartItem(cartItem)];
            case 1:
                newCartItem = _a.sent();
                response.json(newCartItem);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get cart-items item by cart-id:
router.get("/cart/items/:cartId", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, cartItems, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = request.params.cartId;
                return [4 /*yield*/, cart_logic_1.default.getCartItemsByCartId(cartId)];
            case 1:
                cartItems = _a.sent();
                response.json(cartItems);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete cart item:
router.delete("/cart/items/:itemId", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemId = request.params.itemId;
                return [4 /*yield*/, cart_logic_1.default.deleteCartItem(itemId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete ALL cart items:
router.delete("/cart/items/clean/:cartId", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = request.params.cartId;
                return [4 /*yield*/, cart_logic_1.default.deleteAllCartItems(cartId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update cart item:
// router.put("/cart-item", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const cartItem = new CartItemModel(request.body);
//         const updatedCartItem = await cartLogic.updateCartItem(cartItem);
//         response.json(updatedCartItem);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });
// Create new order:
router.post("/orders", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order = new order_model_1.OrderModel(request.body);
                return [4 /*yield*/, cart_logic_1.default.createOrder(order)];
            case 1:
                newOrder = _a.sent();
                response.json(newOrder);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all orders:
router.get("/orders", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_logic_1.default.getAllOrders()];
            case 1:
                orders = _a.sent();
                response.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// // Delete cart item:
// router.delete("/cart-item/:_id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const _id = request.params._id;
//         const deletedCartItem = await cartLogic.deleteCartItem(_id);
//         response.json(deletedCartItem);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });
exports.default = router;
