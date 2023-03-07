import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categoriesSaga';
import { userSaga } from './user/userSaga';

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
