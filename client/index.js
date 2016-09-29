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
import SplashPg from './components/Splashpg';
import MyGroups from './components/MyGroups';
import AllGroups from './components/AllGroups';
import CreateGroup from './components/CreateGroup';
import GroupWall from './components/GroupWall';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

const isAuthenticated = () => {
  console.log(store.getState().auth)
  return store.getState().auth.token && store.getState().auth.authenticated;
}

const ensureAuthenticated = (nextState, replace) => {
  if(!isAuthenticated()) { replace('/signin'); }
};
const skipIfAuthenticated = (nextState, replace) => {
  if(isAuthenticated()) { replace('/userprofile'); }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/'  component={SplashPg} />
    	<Route path='/signup'  component={SignUp} />
    	<Route path='/signin'  component={SignIn} />
    	<Route path='/userquestionnaire' component={Questionnaire}/>
    	<Route path='/fooddiary'  component={FoodDiary}/>
      <Route path='/userprofile'  component={UserProfile} />
      <Route path='/viewallgroups'  component={AllGroups}/>
    	<Route path='/userprofile'  component={UserProfile} />
      <Route path='/mygroups'  component={MyGroups} />
      <Route path='/creategroup'  component={CreateGroup}/>
      <Route path='/groupwall'  component={GroupWall}/>
    </Router>
  </Provider>
, document.getElementById('main'));
