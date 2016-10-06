import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import UserProfileReducer from './userProfile_reducer';
import FoodDiaryReducer from './foodDiary_reducer';
import GroupsReducer from './groups_reducer';
import FriendsReducer from './friends_reducer';
import BrowseReducer from './browse_reducer';
import ChatWindowReducer from './chatWindow_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  userProfile: UserProfileReducer,
  foodDiary: FoodDiaryReducer,
  groups: GroupsReducer,
  friends: FriendsReducer,
  browse: BrowseReducer,
  chatWindow: ChatWindowReducer
});

export default rootReducer;
