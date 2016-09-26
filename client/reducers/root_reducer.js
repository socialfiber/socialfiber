import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import UserProfileReducer from './userProfile_reducer';
import FoodDiaryReducer from './foodDiary_reducer';
import UserGroupsReducer from './userGroups_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  userProfile: UserProfileReducer,
  foodDiary: FoodDiaryReducer,
  myGroups: UserGroupsReducer
});

export default rootReducer;
