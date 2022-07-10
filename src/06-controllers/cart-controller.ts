import express, { NextFunction, Request, Response } from "express";
import { CartItemModel } from "../03-models/cart-item-model";
import cartLogic from "../05-logic/cart-logic";
import cyber from "../01-utils/cyber";
import { OrderModel } from "../03-models/order-model";

const router = express.Router();

// Get cart by user id:
router.get("/cart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.extractUserId(request.headers.authorization);
        const cart = await cartLogic.createCartOrGet(userId);
        response.json(cart);
    } catch (err: any) {
        next(err);
    }
});

// Create cart item:
router.post("/cart/items", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartItem = new CartItemModel(request.body);
        const newCartItem = await cartLogic.createCartItem(cartItem);
        response.json(newCartItem);
    } catch (err: any) {
        next(err);
    }
});

// Get cart-items item by cart-id:
router.get("/cart/items/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        const cartItems = await cartLogic.getCartItemsByCartId(cartId);
        response.json(cartItems);
    } catch (err: any) {
        next(err);
    }
});

// Delete cart item:
router.delete("/cart/items/:itemId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const itemId = request.params.itemId;
        await cartLogic.deleteCartItem(itemId);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

// Delete ALL cart items:
router.delete("/cart/items/clean/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        await cartLogic.deleteAllCartItems(cartId);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

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
router.post("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        const newOrder = await cartLogic.createOrder(order);
        response.json(newOrder);
    } catch (err: any) {
        next(err);
    }
});

// Get all orders:
router.get("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await cartLogic.getAllOrders();
        response.json(orders);
    } catch (err: any) {
        next(err);
    }
});

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

export default router;