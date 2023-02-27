import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
