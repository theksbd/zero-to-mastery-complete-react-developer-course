import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cartAction';
import {
  selectCartCount,
  selectIsCartOpen
} from '../../store/cart/cartSelector';
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon
} from './CartIconStyle.jsx';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const handleClickToggleCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={handleClickToggleCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
