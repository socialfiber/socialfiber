import React from 'react';
import { connect } from 'react-redux';
import { joinGroup } from '../actions/groups';

const AllGroupsIndividual = (props) => (
    <div>
      <div>
        <button onClick= {() =>
        {props.joinGroup(props.group.id)}}>Join Group</button>
      </div>
      <div> {props.group.name} </div>
      <div> {props.group.description} </div>
    </div>
)

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps, { joinGroup })(AllGroupsIndividual);
