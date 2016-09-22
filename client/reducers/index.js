import { combineReducers } from 'redux';
import CreateAccount from './reducer_create_account';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  createAccount: CreateAccount
});

export default rootReducer;
