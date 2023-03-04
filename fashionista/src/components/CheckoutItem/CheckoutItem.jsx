import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart
} from '../../store/cart/CartAction';
import { selectCartItems } from '../../store/cart/CartSelector';
import './CheckoutItem.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleClickAddItemToCart = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const handleClickRemoveItemFromCart = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const handleClickClearItemFromCart = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleClickRemoveItemFromCart}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleClickAddItemToCart}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={handleClickClearItemFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
