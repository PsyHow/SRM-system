import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer } from 'store/tasksReducer/tasksReducer';

const reducers = combineReducers({
  tasksReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof reducers>;
