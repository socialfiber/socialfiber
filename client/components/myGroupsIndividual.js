import React from 'react';

const myGroupsIndividual = (props) => (
		<tr>
			<td><button> Leave Group </button></td>
	  	<td> {props.group.name} </td>
			<td> {props.group.description} </td>
	  </tr>

)

export default myGroupsIndividual;
