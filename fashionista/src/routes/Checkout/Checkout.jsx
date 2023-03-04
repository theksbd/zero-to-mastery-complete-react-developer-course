import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import {
  selectCartItems,
  selectCartTotal
} from '../../store/cart/CartSelector';
import './Checkout.scss';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(item => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className='total'>Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
