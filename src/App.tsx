import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { reducer } from './reducers/reducer';

import './style.scss';
import TopMenu from './components/TopMenu';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);
library.add(fas, far);

ReactDOM.render((
  <Provider store={store}>
    <TopMenu />
  </Provider>
), document.getElementById('app'));
