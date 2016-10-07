import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/groups';
import NavBar from '../ToolBox/NavBar';
import CreateGroup from './CreateGroup';
import IndividualGroup from '../ToolBox/IndividualGroup';


class AllGroups extends Component {
  
  componentWillMount() {
    this.props.fetchAllGroups();
  }

  render() {

    if(this.props.groups === null) {
      return (
        <div>
          <NavBar />
          <h3>Loading groups...</h3>
        </div>
      );
    }
    const groupsList = this.props.groups.map((group, idx) => {
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
    groups: state.browse.allGroups
  }
}

export default connect(mapStateToProps, { fetchAllGroups })(AllGroups);
