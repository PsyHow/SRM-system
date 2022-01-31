import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { applicationListReducer } from 'store/applicationListReducer';

const reducers = combineReducers({
  applicationListReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof reducers>;
