import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer } from 'store/reducers';

const rootReducer = combineReducers({
  tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export type RootReducerType = typeof rootReducer;
export type AppRootState = ReturnType<RootReducerType>;
