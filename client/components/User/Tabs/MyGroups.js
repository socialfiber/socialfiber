import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups, leaveTab } from '../../../actions/groups';
import IndividualGroup from '../../ToolBox/IndividualGroup';
import Cookies from 'js-cookie';


class MyGroups extends Component {

  componentWillMount() {
    this.props.fetchUserGroups();
  }

  componentWillUnmount() {
    this.props.leaveTab();
  }

  render() {

    const noGroups = Cookies.get('userID') === Cookies.get('currentProfileID') ? <h3>You haven't joined any groups.</h3> : <h3>User has not joined any groups.</h3>;

    if(this.props.myGroups === null) {

      return (
        <div>
          <h3>Loading groups...</h3>
        </div>
      );

    } else if(this.props.myGroups.length > 0) {

      const groupsList = this.props.myGroups.map((group, idx) => <IndividualGroup key={idx} group={group} />);

      return (
        <div className="my-groups">
          <table className="my-groups-table">
            <tbody>
              {groupsList}
            </tbody>
          </table>
        </div>
      );

    } else if(this.props.myGroups.length === 0) {

      return (
        <div>
          {noGroups}
        </div>
      );

    }

  }

}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups.userGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups, leaveTab })(MyGroups);
