import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/root_reducer';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Questionnaire from './components/Questionnaire';
import UserProfile from './components/UserProfile';
import SplashPg from './components/Splashpg';
import MyGroups from './components/MyGroups';
import AllGroups from './components/AllGroups';
import CreateGroup from './components/CreateGroup';
import GroupWall from './components/GroupWall';
import BrowseProfile from './components/BrowseProfile';
import ChatWindow from './components/chatWindow';


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
      <Route path='/' component={SplashPg} />
    	<Route path='/signup' onEnter={skipIfAuthenticated} component={SignUp} />
    	<Route path='/signin' onEnter={skipIfAuthenticated} component={SignIn} />
    	<Route path='/userquestionnaire' onEnter={ensureAuthenticated} component={Questionnaire} />
      <Route path='/userprofile' onEnter={ensureAuthenticated} component={UserProfile} />
      <Route path='/viewallgroups' onEnter={ensureAuthenticated} component={AllGroups} />
      <Route path='/mygroups' onEnter={ensureAuthenticated} component={MyGroups} />
      <Route path='/creategroup' onEnter={ensureAuthenticated} component={CreateGroup} />
      <Route path ='/groupwall/:id' onEnter={ensureAuthenticated} component={GroupWall} />
      <Route path ='/browseprofile/:id' onEnter={ensureAuthenticated} component={BrowseProfile} />
      <Route path ='/chat' component={ChatWindow} />
    </Router>
  </Provider>
, document.getElementById('main'));
