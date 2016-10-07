import React from 'react';
import { joinGroup, leaveGroup } from '../../actions/groups';
import { Link } from 'react-router';


const IndividualGroup = (props) => {

	return (

		<tr>
			<td><strong><Link to={`/grouppage/${props.group.id}/${props.group.name}`}>{props.group.name}</Link></strong></td>
			<td>{props.group.description}</td>
			<td><button onClick = {() => {joinGroup(props.group.id); window.location.reload()}}>Join Group</button></td>
      <td><button onClick={ () => {leaveGroup(props.group.id); window.location.reload();}}>Leave Group</button></td>
		</tr>
    
	);

}

export default IndividualGroup;
