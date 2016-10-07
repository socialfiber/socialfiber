import React from 'react';
import { joinGroup, leaveGroup } from '../../actions/groups';
import { Link } from 'react-router';
import GroupButton from './GroupButton'


const IndividualGroup = (props) => {

	return (

		<tr>
			<td><strong><Link to={`/grouppage/${props.group.id}/${props.group.name}`}>{props.group.name}</Link></strong></td>
			<td>{props.group.description}</td>
      <td><GroupButton groupID={props.group.id} /></td>
		</tr>
    
	);

}

export default IndividualGroup;
