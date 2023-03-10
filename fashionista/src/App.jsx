import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Authentication from './routes/Authentication/Authentication';
import Checkout from './routes/Checkout/Checkout';
import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Shop from './routes/Shop/Shop';
import { checkUserSession } from './store/user/userAction';

/* No longer used, I have migrated to Redux-saga, keep this for reference */
// import { setCurrentUser } from './store/user/userAction';
// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener
// } from './utils/firebase/firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /* No longer used, I have migrated to Redux-saga, keep this for reference */
    // const unsubscribe = onAuthStateChangedListener(user => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;

    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
