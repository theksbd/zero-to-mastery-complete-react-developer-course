import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ReactComponent as FashionistaLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import CartIcon from '../../components/CartIcon/CartIcon';
import { selectIsCartOpen } from '../../store/cart/cartSelector';
import { signOutStart } from '../../store/user/userAction';
import { selectCurrentUser } from '../../store/user/userSelector';
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer
} from './NavigationStyle';

// import { signOutUser } from '../../utils/firebase/firebase'; /* No longer used, I have migrated to Redux-saga, keep this for reference */

const Navigation = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

  const signOutUser = () => dispatch(signOutStart());

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
