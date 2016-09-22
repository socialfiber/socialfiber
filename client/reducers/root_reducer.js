import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import UserProfileReducer from './userProfile_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  userProfile: UserProfileReducer
});

export default rootReducer;
