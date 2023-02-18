import { useContext } from 'react';
import './CheckoutItem.scss';
import { CartContext } from '../../contexts/CartContext';

const CheckoutItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const handleClickAddItemToCart = () => addItemToCart(cartItem);
  const handleClickRemoveItemFromCart = () => removeItemFromCart(cartItem);
  const handleClickClearItemFromCart = () => clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name} image`} />
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
