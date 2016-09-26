import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/root_reducer';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Questionnaire from './components/Questionnaire';
import UserProfile from './components/UserProfile';
import FoodDiary from './components/FoodDiary';
import SplashPg from './components/splashpg';
import AllGroups from './components/allGroups'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={SplashPg} />
    	<Route path='signup' component={SignUp} />
    	<Route path='signin' component={SignIn} />
    	<Route path='userquestionnaire' component={Questionnaire}/>
    	<Route path='fooddiary' component={FoodDiary}/>
      <Route path='userprofile' component={UserProfile} />
      <Route path = 'viewallgroups' component={AllGroups}/>
    </Router>
  </Provider>
, document.getElementById('main'));
