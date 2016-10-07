import React from 'react';
import { joinGroup, leaveGroup } from '../../actions/groups';
import { Link } from 'react-router';
import GroupButton from './GroupButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const IndividualGroup = (props) => {

	return (
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			<TableRow>
				<TableRowColumn><strong><Link to={`/grouppage/${props.group.id}/${props.group.name}`}>{props.group.name}</Link></strong></TableRowColumn>
				<TableRowColumn>{props.group.description}</TableRowColumn>
				<TableRowColumn><GroupButton groupID={props.group.id} /></TableRowColumn>
			</TableRow>
		</MuiThemeProvider>
	);
}

export default IndividualGroup;
