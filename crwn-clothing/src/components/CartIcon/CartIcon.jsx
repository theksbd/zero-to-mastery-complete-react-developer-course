import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount
} from './CartIconStyle.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const handleClickToggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={handleClickToggleCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
