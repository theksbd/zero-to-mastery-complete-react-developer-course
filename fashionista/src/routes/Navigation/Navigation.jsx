import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ReactComponent as FashionistaLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import CartIcon from '../../components/CartIcon/CartIcon';
import { selectIsCartOpen } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import { signOutUser } from '../../utils/firebase/firebase';
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer
} from './NavigationStyle';

const Navigation = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <FashionistaLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
