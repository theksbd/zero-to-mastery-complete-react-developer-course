import './ProductCard.scss';
import Button from '../Button/Button';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const handleClickAddItemToCart = () => addItemToCart(product);

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name} image`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={handleClickAddItemToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
