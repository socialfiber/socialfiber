import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/root_reducer';
import Cookies from 'js-cookie';
import SplashPg from './components/Public/SplashPg';
import SignUp from './components/Public/SignUp';
import SignIn from './components/Public/SignIn';
import Questionnaire from './components/User/Edit/Questionnaire';
import UserProfile from './components/User/UserProfile';
import AllGroups from './components/Browse/AllGroups';
import GroupWall from './components/Groups/GroupWall';
import BrowseProfile from './components/User/BrowseProfile';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);


const isAuthenticated = () => {
  return Cookies.get('token') && Cookies.get('authenticated');
}

const ensureAuthenticated = (nextState, replace) => {
  if(!isAuthenticated()) { replace('/signin'); }
}

const skipIfAuthenticated = (nextState, replace) => {
  if(isAuthenticated()) { replace('/userprofile'); }
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' onEnter={skipIfAuthenticated} component={SplashPg} />
    	<Route path='/signup' onEnter={skipIfAuthenticated} component={SignUp} />
    	<Route path='/signin' onEnter={skipIfAuthenticated} component={SignIn} />
    	<Route path='/questionnaire' onEnter={ensureAuthenticated} component={Questionnaire} />
      <Route path='/userprofile' onEnter={ensureAuthenticated} component={UserProfile} />
      <Route path='/viewallgroups' onEnter={ensureAuthenticated} component={AllGroups} />
      <Route path ='/groupwall/:id/:groupname' onEnter={ensureAuthenticated} component={GroupWall} />
      <Route path ='/browseprofile/:id' onEnter={ensureAuthenticated} component={BrowseProfile} />
    </Router>
  </Provider>
, document.getElementById('main'));
