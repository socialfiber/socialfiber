import React from 'react';
import FoodDiary from '../User/Tabs/FoodDiary';
import MyFriends from '../User/Tabs/MyFriends';
import MyGroups from '../User/Tabs/MyGroups';
import GroupWall from '../Groups/GroupWall';
import GroupUsersList from '../Groups/GroupUsersList';


const TabContent = (props) => {
  
  if(props.currentTab === null) {

    return null;
  
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
  
  } else if(props.currentTab === 'GroupWall') {
  
    return (
      <GroupWall />
    );
  
  } else if(props.currentTab === 'GroupUsersList') {
  
    return (
      <GroupUsersList />
    );
  
  }

}

export default TabContent;
