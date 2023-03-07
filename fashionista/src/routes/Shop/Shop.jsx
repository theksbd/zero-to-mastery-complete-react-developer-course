import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { fetchCategoriesAsync } from '../../store/categories/categoriesAction'; /* No longer used, I have migrated to Redux-saga, keep this for reference */
import { fetchCategoriesStart } from '../../store/categories/categoriesAction';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../Category/Category';
import './Shop.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchCategoriesAsync()); /* No longer used, I have migrated to Redux-saga, keep this for reference */
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
