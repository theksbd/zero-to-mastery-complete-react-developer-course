// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.js';
import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocument } from '../utils/firebase/firebase.js';

const CategoriesContext = createContext({
  categoriesMap: {}
});

const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap, setCategoriesMap };

  /* 
  This useEffect code is used to insert data from SHOP_DATA to Firestore database only one time
  After that, remove it to avoid inserting data to Firestore every time the app loads, which is unnecessary
  For me, I will comment it just for reference
  */
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocument();
      setCategoriesMap(categoryMap);
    };
    getCategoryMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };

