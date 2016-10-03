import React from 'react';
import FoodDiary from './FoodDiary';
import MyFriends from './MyFriends';
import MyGroups from './MyGroups';

const TabContent = (props) => {
  
  if(props.currentTab === null) {
    return (
      <div>Please Select Tab</div>
    )
  } else if(props.currentTab === 'FoodDiary') {
    return (
      <FoodDiary />
    );
  } else if(props.currentTab === 'MyFriends') {
    return (
      <MyFriends />
    );
  } else if(props.currentTab === 'MyGroups') {
    return (
      <MyGroups />
    );
  }

}

export default TabContent;
