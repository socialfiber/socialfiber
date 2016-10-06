import React, {Component} from 'react';
import { leaveGroup } from '../actions/groups';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class MyGroupsIndividual extends Component {

	render() {

		return (
			<table>
				<tbody>
					<tr>
						<td>
							<button onClick={ () => {this.props.leaveGroup(this.props.group.id); window.location.reload();}}> Leave Group </button>
						</td>
						<div>
							<strong>
       					<Link to = {'groupwall/'+ this.props.group.id + '/' + this.props.group.name} > {this.props.group.name}</Link>
							</strong>
						</div>
						<td>
							- {this.props.group.description}
						</td>
					</tr>
				</tbody>
			</table>
		);

	}

}

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { leaveGroup })(MyGroupsIndividual);
