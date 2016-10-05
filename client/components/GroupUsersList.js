import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GroupUsersList extends Component {

	render(){
		if(this.props.user){
			return (
				<li>
          <Link to = {'browseprofile/' + this.props.user.id}>{this.props.user.username}</Link>
        </li>
			)
		} else if(!this.props.user){
			return (
				<tr>
		    	<td>
			     	There are no other users in this group.
			    </td>
		    </tr>
			)
		}
	}
}

export default connect(null)(GroupUsersList);
