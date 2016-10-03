import React, {Component} from 'react';
import { leaveGroup } from '../actions/groups';
import { fetchGroupPosts } from '../actions/groups';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class MyGroupsIndividual extends Component {
	constructor (props) {
		super(props)

		this.groupClick = this.groupClick.bind(this)
	}

	groupClick (e) {
		console.log('group was clicked');
		console.log('this.props inside mygroups individual: ',this.props);
		this.props.myGroups.postObject = {'group_id': this.props.group.id, 'group_name': this.props.group.name };
	}

	render(){
		return (
			<tr>
				<td>
					<button onClick={ () => {leaveGroup(this.props.group.id)}}> Leave Group </button>
				</td>
				<div onClick={this.groupClick}>
					<Link to = {'groupwall/'+ this.props.group.id} > {this.props.group.name}</Link>
				</div>
				<td>
					{this.props.group.description}
				</td>
				<td>
				</td>
			</tr>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}


export default connect(mapStateToProps)(MyGroupsIndividual);
