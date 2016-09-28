import React from 'react';
import { joinGroup } from '../actions/groups';

const AllGroupsIndividual = (props) => (
    <tr>
      <td>
        <button onClick= {() =>
        {joinGroup(props.group.id)}}>Join Group</button>
      </td>
      <td> {props.group.name} </td>
      <td> {props.group.description} </td>
    </tr>
)

export default AllGroupsIndividual;
