import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { setCategoriesMap } from '../../store/categories/categoriesAction';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';
import './Shop.scss';
import { useDispatch } from 'react-redux';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocument();
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoryMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
