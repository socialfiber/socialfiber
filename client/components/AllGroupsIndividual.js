import React from 'react';
import { connect } from 'react-redux';
import { joinGroup } from '../actions/groups';
import { Link } from 'react-router';

const AllGroupsIndividual = (props) => (
    // <div>
    //   <div>
    //     <button onClick= {() =>
    //       {props.joinGroup(props.group.id)}}>Join Group</button>
    //   </div>
    //   <div> {props.group.name} </div>
    //   <div> {props.group.description} </div>
    // </div>
    <table>
      <tbody>
        <tr>
          <td><Link to = {'groupwall/' + props.group.id + '/' + props.group.name}><button onClick = {() => {props.joinGroup(props.group.id); window.location.reload()}}>Join Group</button></Link></td>
          <td><strong><Link to = {'groupwall/' + props.group.id + '/' + props.group.name}>{props.group.name}</Link></strong></td>
          <td>- {props.group.description}</td>
        </tr>
      </tbody>
    </table>
)

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps, { joinGroup })(AllGroupsIndividual);
