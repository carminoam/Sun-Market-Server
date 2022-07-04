import { OrderModel, IOrderModel} from '../03-models/order-model';
import { CartModel, ICartModel } from '../03-models/cart-model';
import ErrorModel from '../03-models/error-model';
import { ICartItemModel, CartItemModel} from './../03-models/cart-item-model';

// Get cart by user id:
async function getCartByUserId(userId: string): Promise<ICartModel> {
    const cart = await CartModel.findOne({ userId: userId }).exec();
    // if (!cart) throw new ErrorModel(404, 'Cart not found');
    return cart;
}

// Create cart:
async function createCartOrGet(userId: string): Promise<ICartModel> {
    const existingCart = await getCartByUserId(userId);
    if(existingCart) return existingCart;
    let date = new Date();
    const newCart = new CartModel({ userId , date });
    const createdCart = await newCart.save();
    return createdCart;
}

// Get cart-items by cart-id:
async function getCartItemsByCartId(cartId: string): Promise<ICartItemModel[]> {
    const cartItems = await CartItemModel.find({ cartId: cartId }).populate('product').exec();
    if (!cartItems) throw new ErrorModel(404, 'Cart-items not found');
    return cartItems;
}


// Update cart item:
async function updateCartItem(cartItem: ICartItemModel): Promise<ICartItemModel> {
    const updatedCartItem = await CartItemModel.findByIdAndUpdate(cartItem._id, cartItem,{ returnOriginal: false }).exec();
    if (!updatedCartItem) throw new ErrorModel(404, 'Cart item not found');
    return updatedCartItem;
}

// Create cart item:
async function createCartItem(cartItem: ICartItemModel): Promise<ICartItemModel> {
    const errors = cartItem.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    const addedItem = await cartItem.save();
    const itemWithProduct = await CartItemModel.findById(addedItem._id).populate('product').exec();
    return itemWithProduct;
}

// Delete cart item:
async function deleteCartItem(id: string): Promise<void> {
    const deletedCartItem = await CartItemModel.findByIdAndRemove(id).exec();
    if (!deletedCartItem) throw new ErrorModel(404, 'Cart item not found');
}

// Delete ALL cart items:
async function deleteAllCartItems(cartId: string): Promise<void> {
    const deletedCartItems = await CartItemModel.deleteMany({ cartId: cartId }).exec();
    if (!deletedCartItems) throw new ErrorModel(404, 'Cart items not found');
}

// Create new order:
async function createOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return order.save();
} 

export default {
    // getCartByUserId,
    createCartItem,
    createCartOrGet,
    updateCartItem,
    deleteCartItem,
    getCartItemsByCartId,
    deleteAllCartItems,
    createOrder
}