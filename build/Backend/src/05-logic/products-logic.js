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
var category_model_1 = require("../03-models/category-model");
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var error_model_1 = __importDefault(require("../03-models/error-model"));
var product_model_1 = require("../03-models/product-model");
var fs_1 = __importDefault(require("fs"));
// Get all products:
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, product_model_1.ProductModel.find().populate("category").exec()];
        });
    });
}
//  Get all categories;
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, category_model_1.CategoryModel.find().exec()];
        });
    });
}
//Get one product:
function getOneProduct(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("the id : " + _id);
                    return [4 /*yield*/, product_model_1.ProductModel.findById(_id).populate("category").exec()];
                case 1:
                    product = _a.sent();
                    if (!product)
                        throw new error_model_1.default(404, "_id ".concat(_id, " not found"));
                    return [2 /*return*/, product];
            }
        });
    });
}
// Add product:
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var extension, absolutePath, errors, addedProduct, productWithCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!product.image) return [3 /*break*/, 2];
                    extension = product.image.name.substring(product.image.name.lastIndexOf("."));
                    product.imageName = (0, uuid_1.v4)() + extension; // Generate new uniq name.
                    absolutePath = path_1.default.join(__dirname, "..", "assets", "images", product.imageName);
                    return [4 /*yield*/, product.image.mv(absolutePath)];
                case 1:
                    _a.sent(); //Move image to folder.
                    _a.label = 2;
                case 2:
                    errors = product.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    product.image = undefined;
                    return [4 /*yield*/, product.save()];
                case 3:
                    addedProduct = _a.sent();
                    return [4 /*yield*/, product_model_1.ProductModel.findById(addedProduct._id).populate("category").exec()];
                case 4:
                    productWithCategory = _a.sent();
                    return [2 /*return*/, productWithCategory];
            }
        });
    });
}
// Update product:
function updateProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbProduct, extension, absolutePath, currentName, extension_1, absolutePath, updatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = product.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    return [4 /*yield*/, product_model_1.ProductModel.findById(product._id).populate("category").exec()];
                case 1:
                    dbProduct = _a.sent();
                    if (!product.image) return [3 /*break*/, 6];
                    extension = product.image.name.substring(product.image.name.lastIndexOf("."));
                    if (!dbProduct.imageName) return [3 /*break*/, 4];
                    absolutePath = path_1.default.join(__dirname, "..", "assets", "images", dbProduct.imageName);
                    return [4 /*yield*/, fs_1.default.unlink(absolutePath, function (err) {
                            if (err) {
                                throw err;
                            }
                        })];
                case 2:
                    _a.sent();
                    currentName = dbProduct.imageName.substring(0, dbProduct.imageName.lastIndexOf("."));
                    product.imageName = currentName + extension; // The old name + the new extension.
                    return [4 /*yield*/, product.image.mv(path_1.default.join(__dirname, "..", "assets", "images", product.imageName))];
                case 3:
                    _a.sent(); //Move image to folder.
                    product.image = undefined; // Delete the file from the vacation object.
                    return [3 /*break*/, 6];
                case 4:
                    extension_1 = product.image.name.substring(product.image.name.lastIndexOf("."));
                    product.imageName = (0, uuid_1.v4)() + extension_1; // Generate new uniq name.
                    absolutePath = path_1.default.join(__dirname, "..", "assets", "images", product.imageName);
                    return [4 /*yield*/, product.image.mv(absolutePath)];
                case 5:
                    _a.sent(); //Move image to folder.
                    product.image = undefined; // Delete the file from the vacation object.
                    _a.label = 6;
                case 6: return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).populate('category').exec()];
                case 7:
                    updatedProduct = _a.sent();
                    if (!updateProduct)
                        throw new error_model_1.default(404, "_id ".concat(product._id, " not found"));
                    return [2 /*return*/, updatedProduct];
            }
        });
    });
}
// Delete product:
function deleteProduct(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_model_1.ProductModel.findByIdAndDelete(_id).exec()];
                case 1:
                    deletedProduct = _a.sent();
                    if (!deletedProduct)
                        throw new error_model_1.default(404, "_id ".concat(_id, " not found"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllProducts: getAllProducts,
    getOneProduct: getOneProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getAllCategories: getAllCategories
};
