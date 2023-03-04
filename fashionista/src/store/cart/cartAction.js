import { createAction } from '../../utils/reducer/reducer';
import { CART_ACTION_TYPES } from './cartTypes';

const addCartItem = (cartItems, productToAdd) => {
  // Find if cartItems already has productToAdd
  const existingItem = cartItems.find(item => item.id === productToAdd.id);
  // If found, increase the quantity by 1
  if (existingItem) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  // If not found, add productToAdd to cartItems with quantity is 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // Find the cart item to remove
  const existingItem = cartItems.find(item => item.id === productToRemove.id);
  // If the item's quantity is 1, remove it from cartItems
  if (existingItem.quantity === 1) {
    return cartItems.filter(item => item.id !== productToRemove.id);
  }
  // Otherwise, decrease the quantity by 1
  return cartItems.map(item =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(item => item.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = isCartOpen =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, isCartOpen);
