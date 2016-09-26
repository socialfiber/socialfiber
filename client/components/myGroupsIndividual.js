import React from 'react';

const myGroupsIndividual = (props) => {
	return (
		<tr>
			<td>{props.groups.name}</td>
			<td>{props.groups.description}</td>
		</tr>
	);
}

export default myGroupsIndividual;
