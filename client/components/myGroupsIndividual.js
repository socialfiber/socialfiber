import React from 'react';
import { leaveGroup } from '../actions/groups';

const myGroupsIndividual = (props) => (
		<tr>
			<td>
					<button onClick={ () => {leaveGroup(props.group.id)}}> Leave Group </button>
			</td>
	  	<td> {props.group.name} </td>
			<td> {props.group.description} </td>
	  </tr>
)

export default myGroupsIndividual;
