import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../store/cart/cartAction';
import {
  selectCartItems,
  selectIsCartOpen
} from '../../store/cart/cartSelector';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage
} from './CartDropdownStyle.jsx';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleClickGoToCheckoutPage = () => {
    dispatch(setIsCartOpen(!isCartOpen));
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleClickGoToCheckoutPage}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
