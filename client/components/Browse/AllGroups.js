import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/groups';
import NavBar from '../ToolBox/NavBar';
import CreateGroup from './CreateGroup';
import IndividualGroup from '../ToolBox/IndividualGroup';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class AllGroups extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showCheckboxes: false,
      enableSelectAll: false
    };
  }


  componentWillMount() {
    this.props.fetchAllGroups();
  }

  render() {

    if(this.props.groups === null) {
      return (
        <div>
          <NavBar />
          <h3>Loading groups...</h3>
        </div>
      );
    }
    const groupsList = this.props.groups.map((group, idx) => {
      return (
          <IndividualGroup key={idx} group={group}/>
      );
    });
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <NavBar />
          <h1>Find a Group</h1>
          <h4>Can't find a group? Start your own!</h4>
          <CreateGroup />
          <Table className="all-groups-table">
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}>
              <TableHeader
                adjustForCheckbox={this.state.showCheckboxes}
                displaySelectAll={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}>
                <TableRow>
                  <TableHeaderColumn className="all-groups-headers">Name</TableHeaderColumn>
                  <TableHeaderColumn className="all-groups-headers">Description</TableHeaderColumn>
                  <TableHeaderColumn className="all-groups-headers">Join</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableRow>
                {groupsList}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    groups: state.browse.allGroups
  }
}

export default connect(mapStateToProps, { fetchAllGroups })(AllGroups);
