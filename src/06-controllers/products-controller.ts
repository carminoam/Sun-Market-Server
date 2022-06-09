import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { ProductModel } from "../03-models/product-model";
import logic from "../05-logic/products-logic";
import path from 'path';
import cyber from "../01-utils/cyber";

const router = express.Router();

// Get all products:
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// Get all categories:
router.get("/products/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await logic.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});

// Get product by id:
router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await logic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// Add new product:
router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.pic;
        const product = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

//Get product image:
router.get("/product/image/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
});

router.put("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;