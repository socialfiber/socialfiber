import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/groups';
import IndividualGroup from '../ToolBox/IndividualGroup';
import NavBar from '../ToolBox/NavBar';
import CreateGroup from './CreateGroup';


class AllGroups extends Component {
  
  componentWillMount() {
    this.props.fetchAllGroups();
  }

  render() {

    const groupsList = this.props.groups.allGroups.map((group, idx) => {
      return (
          <IndividualGroup key={idx} group={group}/>
      );
    });
    return (
      <div>
        <NavBar />
        <h1>Find a Group</h1>
        <h4>Can't find a group? Start your own!</h4>
        <CreateGroup />
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {groupsList}
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps, { fetchAllGroups })(AllGroups);
