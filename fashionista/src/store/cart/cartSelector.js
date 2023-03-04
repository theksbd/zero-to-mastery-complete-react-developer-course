import { createSelector } from 'reselect';

const selectCartReducer = state => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cart => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  cart => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, current) => total + current.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (total, current) => total + current.quantity * current.price,
    0
  )
);
