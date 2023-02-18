import { useContext } from 'react';
import Button from '../Button/Button';
import './CartDropdown.scss';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../CartItem/CartItem';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClickGoToCheckoutPage = () => {
    setIsCartOpen(!isCartOpen);
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={handleClickGoToCheckoutPage}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
