import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import Landing from './landing';
import reducers from './reducers/index';
import UserQuestionnaire from './components/userQuestionnaire'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
console.log(store)

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='/userQuestionnaire' component={UserQuestionnaire}/>
  </Router>
, document.getElementById('main'));
