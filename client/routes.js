import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import Landing from './landing';
import reducers from './reducers/index';
import UserQuestionnaire from './containers/userQuestionnaire'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path='/' component={Landing} />
      <Route path='/userQuestionnaire' component={UserQuestionnaire}/>
    </Router>
  </Provider>
, document.getElementById('main'));
