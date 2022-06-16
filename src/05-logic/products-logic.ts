import { CategoryModel, ICategoryModel } from '../03-models/category-model';
import path from "path";
import { v4 as uuid } from 'uuid';
import ErrorModel from "../03-models/error-model";
import { IProductModel, ProductModel } from "../03-models/product-model";

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
    const product = await ProductModel.findById(_id).exec();
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
    return product.save();
}

// Update product:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
    if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);

    return updatedProduct;
}

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

