import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { ActionReducer, tasksReducer } from 'store/tasksReducer/tasksReducer';

const reducers = combineReducers({
  tasksReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof reducers>;

export type AppActionsType = ActionReducer;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>;
