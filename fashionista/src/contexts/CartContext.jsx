import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer';

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

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const setIsCartOpen = isCartOpen => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, isCartOpen));
  };

  const updateCartItems = newCartItems => {
    let newCartCount = 0;
    let newCartTotal = 0;

    for (let i = 0; i < newCartItems.length; i++) {
      const cartItem = newCartItems[i];
      newCartCount += cartItem.quantity;
      newCartTotal += cartItem.quantity * cartItem.price;
    }

    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal
    };
    
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = productToAdd => {
    updateCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = productToRemove => {
    updateCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = cartItemToClear => {
    updateCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };

