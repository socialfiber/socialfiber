import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTab } from '../actions/tabs';
import TabContent from './TabContent';

class Tabs extends Component {

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li onClick={()=>{this.props.changeTab('FoodDiary')}}><a href="#">Food Diary</a></li>
            <li onClick={()=>{this.props.changeTab('MyFriends')}}><a href="#">My Friends</a></li>
            <li onClick={()=>{this.props.changeTab('MyGroups')}}><a href="#">My Groups</a></li>
          </ul>
        <TabContent currentTab={this.props.currentTab} />
        </nav>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentTab: state.tabs.currentTab
  }
}

export default connect(mapStateToProps, { changeTab })(Tabs);
