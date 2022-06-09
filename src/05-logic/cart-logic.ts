import { CartModel, ICartModel } from '../03-models/cart-model';
import ErrorModel from '../03-models/error-model';
import { ICartItemModel, CartItemModel} from './../03-models/cart-item-model';

// Get cart by user id:
async function getCartByUserId(id: string): Promise<ICartModel> {
    const cart = await CartModel.findOne({ userId: id }).exec();
    if (!cart) throw new ErrorModel(404, 'Cart not found');
    return cart;
}

// Get cart-items item by cart-id:
async function getCartItemsByCartId(id: string): Promise<ICartItemModel[]> {
    const cartItems = await CartItemModel.find({ cartId: id }).exec();
    if (!cartItems) throw new ErrorModel(404, 'Cart-items not found');
    return cartItems;
}

// Create cart:
async function createCart(userId: string): Promise<ICartModel> {
    let date = new Date();
    // date.toLocaleDateString();
    const newCart = new CartModel({ userId , date });
    const createdCart = await newCart.save();
    return createdCart;
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
    return cartItem.save();
}

// Delete cart item:
async function deleteCartItem(id: string): Promise<ICartItemModel> {
    const deletedCartItem = await CartItemModel.findByIdAndRemove(id).exec();
    if (!deletedCartItem) throw new ErrorModel(404, 'Cart item not found');
    return deletedCartItem;
}

export default {
    getCartByUserId,
    createCartItem,
    createCart,
    updateCartItem,
    deleteCartItem,
    getCartItemsByCartId
}