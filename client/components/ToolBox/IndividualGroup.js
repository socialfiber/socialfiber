import React from 'react';
import { joinGroup } from '../../actions/groups';
import { Link } from 'react-router';


const IndividualGroup = (props) => {
	console.log(props);
	return (
		<tr>
			<td><strong><Link to={`/groupwall/${props.group.id}/${props.group.name}`}>{props.group.name}</Link></strong></td>
			<td>{props.group.description}</td>
		</tr>
	);

}

export default IndividualGroup;
