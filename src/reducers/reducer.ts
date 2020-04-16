import { combineReducers } from 'redux';

import { menuReducer } from './menu.reducer';

export const reducer = combineReducers({
  menu: menuReducer,
});
