import { CategoryModel, ICategoryModel } from '../03-models/category-model';
import path from "path";
import { v4 as uuid } from 'uuid';
import ErrorModel from "../03-models/error-model";
import { IProductModel, ProductModel } from "../03-models/product-model";
import fs from "fs";

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category").exec();
}

//  Get all categories;
async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

//Get one product:
async function getOneProduct(_id: string): Promise<IProductModel> {
    console.log("the id : " + _id);
    const product = await ProductModel.findById(_id).populate("category").exec();
    if (!product) throw new ErrorModel(404, `_id ${_id} not found`);
    return product;
}

// Add product:
async function addProduct(product: IProductModel): Promise<IProductModel> {
    // Handle image:
    if (product.image) {
        const extension = product.image.name.substring(product.image.name.lastIndexOf(".")); // Extract the file extension.
        product.imageName = uuid() + extension; // Generate new uniq name.
        const absolutePath = path.join(__dirname, "..", "assets", "images", product.imageName);
        await product.image.mv(absolutePath); //Move image to folder.
    }
    const errors = product.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    product.image = undefined;
    const addedProduct = await product.save();
    const productWithCategory = await ProductModel.findById(addedProduct._id).populate("category").exec();
    return productWithCategory;
}

// Update product:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    const dbProduct = await ProductModel.findById(product._id).populate("category").exec();

    // Handle image:
    if (product.image) {
        const extension = product.image.name.substring(product.image.name.lastIndexOf(".")); // Extract the file extension.
        if (dbProduct.imageName) { // If there is image before updating.
            const absolutePath = path.join(__dirname, "..", "assets", "images", dbProduct.imageName);
            await fs.unlink(absolutePath, function (err) { // Delete the old image from the folder.
                if (err) {
                    throw err;
                }
            });
            const currentName = dbProduct.imageName.substring(0, dbProduct.imageName.lastIndexOf(".")); // Extract the current name without extension.
            product.imageName = currentName + extension; // The old name + the new extension.
            await product.image.mv(path.join(__dirname, "..", "assets", "images", product.imageName)); //Move image to folder.
            product.image = undefined; // Delete the file from the vacation object.
        } else { // if there is no existing image.
            const extension = product.image.name.substring(product.image.name.lastIndexOf(".")); // Extract the file extension.
            product.imageName = uuid() + extension; // Generate new uniq name.
            const absolutePath = path.join(__dirname, "..", "assets", "images", product.imageName);
            await product.image.mv(absolutePath); //Move image to folder.
            product.image = undefined; // Delete the file from the vacation object.
        }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).populate('category').exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
    if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);

    return updatedProduct;
}

// Delete product:
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new ErrorModel(404, `_id ${_id} not found`);
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllCategories
};

