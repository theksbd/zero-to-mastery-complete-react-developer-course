import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, setIsCartOpen } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleClickAddItemToCart = () => {
    dispatch(addItemToCart(cartItems, product));
    dispatch(setIsCartOpen(false));
  };

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleClickAddItemToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
