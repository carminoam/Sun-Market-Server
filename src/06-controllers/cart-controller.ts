import express, { NextFunction, Request, Response } from "express";
import { CartItemModel } from "../03-models/cart-item-model";
import cartLogic from "../05-logic/cart-logic";
import cyber from "../01-utils/cyber";

const router = express.Router();

// Get cart by user id:
router.get("/cart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.extractUserId(request.headers.authorization);
        console.log(userId);
        const cart = await cartLogic.getCartByUserId(userId);
        response.json(cart);
    }
    catch (err: any) {
        next(err);
    }
});

//create new cart: 
router.post("/cart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.extractUserId(request.headers.authorization);
        const newCart = await cartLogic.createCart(userId);
        response.status(201).json(newCart);
    }
    catch (err: any) {
        next(err);
    }
});

// Get cart-items item by cart-id:
router.get("/cart/items/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.id;
        const cartItems = await cartLogic.getCartItemsByCartId(cartId);
        response.json(cartItems);
    }
    catch (err: any) {
        next(err);
    }
});

// Create cart item:
router.post("/cart-item", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log(request.body);
        const cartItem = new CartItemModel(request.body);
        const newCartItem = await cartLogic.createCartItem(request.body);
        response.json(newCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

// Update cart item:
router.put("/cart-item", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartItem = new CartItemModel(request.body);
        const updatedCartItem = await cartLogic.updateCartItem(cartItem);
        response.json(updatedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete cart item:
router.delete("/cart-item/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const deletedCartItem = await cartLogic.deleteCartItem(_id);
        response.json(deletedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;