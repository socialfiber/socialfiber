import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/root_reducer';

import SignUp from './components/signup';
import SignIn from './components/signin';
import Questionnaire from './components/questionnaire';
import UserProfile from './components/UserProfile';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path='signup' component={SignUp} />
    	<Route path='signin' component={SignIn} />
    	<Route path='userQuestionnaire' component={Questionnaire}/>
      <Route path='userProfile' component={UserProfile} />
    </Router>
  </Provider>
, document.getElementById('main'));
