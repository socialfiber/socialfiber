import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups, leavePage } from '../../actions/groups';
import NavBar from '../ToolBox/NavBar';
import CreateGroup from './CreateGroup';
import IndividualGroup from '../ToolBox/IndividualGroup';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class AllGroups extends Component {

  componentWillMount() {
    this.props.fetchAllGroups();
  }

  componentWillUnmount() {
    this.props.leavePage();
  }

  render() {

    console.log("AllGroups: ", this.props.groups);

    if(this.props.groups === null) {

      return (
        <div>
          <NavBar />
          <h3 className="center">Loading groups...</h3>
        </div>
      );

    } else {

      const groupsList = this.props.groups.map((group, idx) => <IndividualGroup key={idx} group={group}/>);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container-centered">
          <NavBar />
          <h1 className="center">Find a Group</h1>
          <br></br>
          <Table className="all-groups-table">
            <TableBody
              displayRowCheckbox={false}
              className="all-groups-table-body container-centered">
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
                enableSelectAll={false}>
                <TableRow>
                  {groupsList}
                </TableRow>
                </TableHeader>
              </TableBody>
            </Table>
            <br></br>
            <h4>Can't find a group? Start your own!</h4>
            <CreateGroup />
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.browse.allGroups
  }
}

export default connect(mapStateToProps, { fetchAllGroups, leavePage })(AllGroups);
