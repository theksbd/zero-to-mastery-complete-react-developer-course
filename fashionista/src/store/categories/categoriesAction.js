import { createAction } from '../../utils/reducer/reducer';
import { CATEGORIES_ACTION_TYPES } from './categoriesTypes';

export const setCategoriesMap = categoriesMap =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
