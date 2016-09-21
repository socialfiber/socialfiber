import { combineReducers } from 'redux';
import CreateAccount from './reducer_create_account';

const initialState = 

const rootReducer = combineReducers({
  createAccount: CreateAccount
});

export default rootReducer;
