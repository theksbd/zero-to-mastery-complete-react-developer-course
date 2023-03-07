import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase';
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess
} from './categoriesAction';
import { CATEGORIES_ACTION_TYPES } from './categoriesTypes';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocument);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
